//===============
// VARIABLES
//===============

// Reactions array
var reactions = ["wow", "omg", "shocked", "laughing", "funny", "surprised", "amazing", "excited", "worried", "pouting", "sad", "happy", "mad", "scared", "confident", "shy", "tired", "sleepy", "cheerful", "exhausted"];

//===============
// FUNCTIONS
//===============

// Place the initial buttons on the page
function renderButtons() {
  // Empty the button container
  $(".btnContainer").empty();

  for (var i = 0; i < reactions.length; i++) {
    // Create a div to hold the buttons
    var btnDiv = $("<div>");
    btnDiv.addClass("col-md-3 col-sm-6 col-xs-12 btnDiv");

    // Each reaction in the array will get assigned to a button
    var giphyBtn = $("<button>");
    giphyBtn.addClass("reaction btn btn-primary btn-lg");
    giphyBtn.attr("data-name", reactions[i]);
    giphyBtn.text(reactions[i]);

    // Append the button to the button div
    btnDiv.append(giphyBtn);

    // Append the button div to the HTML button container
    $(".btnContainer").append(btnDiv);
  }
}

// Make a call to the Giphy API
function callGiphy() {
  // Empty the gif container and the gifHeader
  $(".gifContainer").empty();
  $(".gifHeader").empty();

  var reaction = $(this).attr("data-name");

  // Establish the API parameters
  var apiKey = "8HowGhMe8GG4dFwu51eMc5xgg2WCQzu4";
  var rating = "g";
  var limit = 10;

  // Construct a queryURL based on the parameters
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    reaction + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;

  // Log the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");

  // Perform an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
      console.log(response);

      // Store the data from the AJAX request in a variable
      var results = response.data;

      // Create a div to act as the header for the gif output
      var gifHeader = $("<div>");
      gifHeader.addClass("gifHeader");
      gifHeader.text(reaction + " gifs:");
      $(".gifHeader").append(gifHeader);

      // Loop through each result item
      for (var i = 0; i < results.length; i++) {

        // Create a div for the gifs
        var gifDiv = $("<div>");
        gifDiv.addClass("col-md-3 col-sm-6 col-xs-12 gifDiv");

        // Create a an image tag
        var reactionImage = $("<img>");

        // Set the gif image source to a still image
        reactionImage.attr("src", results[i].images.fixed_height_still.url);

        // Set the gif data-still attribute to the still image link
        reactionImage.attr("data-still", results[i].images.fixed_height_still.url);

        // Set the gif data-animate attribute to the animated image link
        reactionImage.attr("data-animate", results[i].images.fixed_height.url);

        // Set the gif's data-state value to 'still'
        reactionImage.attr("data-state", "still");

        reactionImage.addClass("gif img-responsive img-thumbnail");

        // Create a text div for the gif's rating value
        var gifText = $("<div>");
        gifText.addClass("gifText");
        gifText.text("Rating: " + results[i].rating);

        // Append the image to the gif div
        gifDiv.append(reactionImage);

        // Append the text to the gif div
        gifDiv.append(gifText);

        // Place the gif div into the gif container
        $(".gifContainer").prepend(gifDiv);
      }
    });
}

// An event listener for a click on any of the reaction buttons to retrieve gifs based on that reaction from Giphy
$(document).on("click", ".reaction", callGiphy);

// An event listener for a click on any of the gifs to pause / unpause them
$(document).on("click", ".gif", gifAnimate);

// Set the actions for pausing / unpausing the gifs
function gifAnimate() {
  var state = $(this).attr("data-state");
  // If the gif's image state is 'still', update its src attribute to what its data-animate value is.
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

// Add a reaction button to the listing based on the user's input
$("#add-reaction").on("click", function (event) {
  // Prevent the button's default behavior when clicked (which is submitting a form)
  event.preventDefault();
  
  // Get the input from the textbox
  var newReaction = $("#giphyInput").val().trim();

  // Add the reaction from the textbox to the array
  reactions.push(newReaction);

  // Call renderButtons to add the new button
  renderButtons();
});

//===============
// MAIN PROCESS
//===============

renderButtons();