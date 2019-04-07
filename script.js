// declaring starting variables
var buttons = ["Counter Strike", "Skyrim", "Hitman", "Dark Souls"];
var userInput = $("#newButton").val();

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
  buttons.push(userInput);
  $('#gifButtons').empty();
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

      gifSpot
        .attr("href", response.data[j].original_still_url)
        .attr("data-still", response.data[j].original_still_url)
        .attr("data-animate", response.data[j].original_url)
        .attr("data-state", "still");

      newDiv.append(rating).append(response.data[j].original_still_url);
      $("#gifContainer").append(newDiv);
    }
  });
});
