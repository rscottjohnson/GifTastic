// when a gif is clicked, the gif unpauses and plays, and pauses when it's clicked again
// when a new button is clicked, the page loads with 10 new gifs for that topic / keyword; the old gifs are replaced.

// giphy emotes array
var reactions = ["wow", "omg", "shocked", "laughing", "funny", "surprised", "amazing", "excited", "worried", "pouting", "sad", "happy", "mad", "scared", "confident", "shy", "tired", "sleepy", "cheerful", "exhausted"];

// should be able to pause and unpause gifs via the 15 exercise
// should be able to get button html layout from bootstrap

function renderButtons() {
  $(".btnRow").empty();

  for (var i = 0; i < reactions.length; i++) {
    var giphyBtn = $("<button>");
    // giphyBtn.attr("type", "button");
    giphyBtn.addClass("reaction");

    giphyBtn.attr("data-name", reactions[i]);

    giphyBtn.text(reactions[i]);
    $(".btnRow").append(giphyBtn);
  }
}

// $(document).ready(function () {
  // $(".reaction").on("click", function () {
    function callGiphy() {
    // Grabbing and storing the data-animal property value from the button
    $(".gifRow").empty();
    var reaction = $(this).attr("data-name");
    var apiKey = "8HowGhMe8GG4dFwu51eMc5xgg2WCQzu4";
    var rating = "g";
    var limit = 10;

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      reaction + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .then(function (response) {
        // console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          // var reactionDiv = $("<div>");
          var reactionDiv = $(".gifRow");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var reactionImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item

          // Original setup
          // reactionImage.attr("src", results[i].images.fixed_height.url);

          // Set the gif image source to a still image
          reactionImage.attr("src", results[i].images.fixed_height_still.url);

          // Set the gif data-still attribute to the still image link
          reactionImage.attr("data-still", results[i].images.fixed_height_still.url);

          // Set the gif data-animate attribute to the animated image link
          reactionImage.attr("data-animate", results[i].images.fixed_height.url);

          reactionImage.attr("data-state", "still");

          reactionImage.addClass("gif");
          // reactionImage.attr("id", "gif");
          // reactionImage.attr("data-still", "");
          // reactionImage.attr("data-animate", "");

          // Appending the paragraph and image tag to the animalDiv
          reactionDiv.append(p);
          // $(".gifRow").append(p);
          reactionDiv.append(reactionImage);
          // $(".gifRow").append(reactionImage);


          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $(".gifRow").prepend(reactionDiv);
        }
      });
    }
//       });
//   });
//   // $(document).on("click", ".gif", gifAnimate);
// });

$(document).on("click", ".reaction", callGiphy);
$(document).on("click", ".gif", gifAnimate);

function gifAnimate() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  $("#add-emotion").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var newReaction = $("#giphyInput").val().trim();

    // Adding the movie from the textbox to our array
    reactions.push(newReaction);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });


renderButtons();