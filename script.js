// declaring starting variables
var buttons = ["CSGO", "Skyrim", "Hitman", "Dark Souls"];

function displayButtons() {
  for (i = 0; i < buttons.length; i++) {
    $("#gifButtons").append(
      "<button class='gifButtons' data=" +
        buttons[i] +
        ">" +
        buttons[i] +
        "</button>"
    );
  }
}

displayButtons();

$("#submitButton").on("click", function() {
  event.preventDefault();

  var userInput = $("#newButton")
    .val()
    .trim();

  buttons.push(userInput);
  $("#gifButtons").empty();
  displayButtons();
});

$(".gifButtons").on("click", function() {
  var searchTerm = $(this).attr("data");
  console.log(this);

  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    "&api_key=eo4KL4w2tL21Duv6n4u7Q1cvwM4HdNQo&limit=5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    $("#gifContainer").empty();

    for (j = 0; j < response.data.length; j++) {
      var newDiv = $("<div>");
      var rating = $("<p>").text("Rated " + response.data[j].rating);
      var gifSpot = $("<img>");

      console.log(response.data[j].url);

      gifSpot.attr("src", response.data[j].images.original_still.url);
      gifSpot.attr("data-still", response.data[j].images.original_still.url);
      gifSpot.attr("data-animate", response.data[j].images.original.url);
      gifSpot.attr("data-state", "still");
      gifSpot.attr("class", "gif");

      newDiv.append(rating);
      newDiv.append(gifSpot);
      $("#gifContainer").append(newDiv);
    }
  });
});

$(document).on("click", ".gif", function playPause() {
  var state = $(this).attr("data-state");
  var play = $(this).attr("data-animate");
  var pause = $(this).attr("data-still");

  if (state === "still") {
    $(this).attr("src", play);
    $(this).attr("data-state", "animate");
  } else if (state === "animate") {
    $(this).attr("src", pause);
    $(this).attr("data-state", "still");
  }
});
