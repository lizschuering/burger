$(function () {
    //When the submit button is clicked...
    $("#newBurger").on("click", function() {
        event.preventDefault();
        console.log("I'm being clicked!");

        //Create a new object in the database with the name of the burger entered and set devoured to 0 (false)
        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: 0
        }
        console.log("Here's the newBurger object: ", newBurger);

        //Send a POST request with the new burger info
        $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function (){
            console.log("New burger added.");
            //Reload the page to see a list of all burgers, including the one that was just added.
            location.reload();
        })
    });

    $(function() {
        $(".devour").on({
            mouseenter: function() {
                $(this).attr('src', './assets/img/mouth.png');
            },
            mouseleave: function() {
                $(this).attr('src', './assets/img/burger.png');
            }
        });
    });

    $(".devour").on("click", function() {
        event.preventDefault();
        console.log("I'm being clicked!");

        var id = $(this).data("id");
        var changeEaten = $(this).data("eaten");

        console.log("Here's the id: ", id);
        console.log("Here is the eaten state: ", changeEaten);

        var eatenState = {
            devoured: 1
        };

        //Send PUT request to change devoured from 0 to 1 (false to true)
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eatenState
            }).then(
            function() {
                console.log("Changed devoured to ", changeEaten);
                // Reload the page to get the updated list
                location.reload();
        });
    });

});