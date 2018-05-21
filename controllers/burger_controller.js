var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger");

//Create our rotes and logic where required
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var burgerObj = {
        burgers: data
      };
      console.log(burgerObj);
      res.render("index", burgerObj);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
  var state = "id = " + req.params.id;

  console.log("state", state);

  burger.updateOne({
    devoured: req.body.devoured
  }, state, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;