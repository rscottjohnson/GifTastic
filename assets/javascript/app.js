// put in an array of emotions, loop over them to create buttons on the page
// when a button is clicked, the page fills with 10 gifs for that keyword or topic
// when a gif is clicked, the gif unpauses and plays, and pauses when it's clicked again
// when a new button is clicked, the page loads with 10 new gifs for that topic / keyword; the old gifs are replaced.

// giphy reactions array
var reactions = ["wow", "omg", "shocked", "laughing", "funny", "surprised", "amazing", "excited", "worried", "pouting", "sad", "happy", "mad", "scared", "confident", "shy", "tired", "sleepy", "cheerful", "exhausted"];

// // ADDED THIS -- NEEDS TO BE ADJUSTED / SIMILAR CODE FARTHER BELOW REMOVED, ETC...
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
// var queryParams = {
//   "api-key": "8HowGhMe8GG4dFwu51eMc5xgg2WCQzu4"
// };

// should be able to add buttons via the 09 exercise
// the 09 exercise also loops through an array, which we can use here
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


// //javascript, jQuery
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function (data) {
//   console.log("success got data", data);
// });

// look through the giphy api and figure out how to setup the string request
// setup a queryURL equal to this string and use that in the on click function
// Go back and look at the NY Times example for help
$(document).ready(function() {
  $("button").on("click", function () {
  // Grabbing and storing the data-animal property value from the button
  $(".gifRow").empty();
  var reaction = $(this).attr("data-name");
  console.log(reaction);

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    reaction + "&api_key=8HowGhMe8GG4dFwu51eMc5xgg2WCQzu4&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var reactionDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var reactionImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        reactionImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        reactionDiv.append(p);
        reactionDiv.append(reactionImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $(".gifRow").prepend(reactionDiv);
      }
    });
});
});


renderButtons();