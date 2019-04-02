

var TVSeries = ["Game of Thrones", "The Big Bang Theory", "Breaking Bad", "Saturday Night Live", "The Office", "Friends", "Rick and Morty", "Seinfeld"];

// for loop through array and create a button for each item
function Buttonlist() {
    $("#buttons").empty();
    for (i=0; i < TVSeries.length; i++) {
        var TVButtons = $("<button>").addClass("TV-btn btn-danger btn-md").attr("data-name", TVSeries[i]).text(TVSeries[i]);
        $("#buttons").append(TVButtons);
        console.log(TVSeries[i])
    };
};

Buttonlist();

//Submit button adds a new tv series to rendered buttons
$("#add-Series").on("click", function(event) {
    var newSeries = $("#TV-Show").val().trim();
    TVSeries.push(newSeries);
    Buttonlist();
    event.preventDefault();
    console.log(TVSeries);
});

//Grab buttons attribute and run through giphy's api. creating Giphys below
function TVGiphyDisplay() {
    var TVShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Hvo2dYK6IhZqGQAGcUitru4GTRR6x5XI&q=" + TVShow + "&limit=10&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var ShowsPush = $("#TV-series")
        console.log(response.data)

        for ( i = 0; i < response.data.length; i++) {
            var giphinPlay = response.data[i].images.original.url;
            var giphStill = response.data[i].images.original_still.url;
            var giphy = $("<img>").attr("src", giphStill).attr("data-stop", giphStill).attr("data-play", giphinPlay).attr("data-state", "pause").addClass("gif")
            ShowsPush.append(giphy);

            //adding rating text underneath Giphy image
            var TVrating = response.data[i].rating
            var rate = $("<p>").text("Rating: " + TVrating);
            ShowsPush.append(rate); 
        };   
    });
};

//Change the giphy from playing and stopping
$(document).on("click", ".TV-btn", TVGiphyDisplay);

// if giphy is paused on click then play
$("#TV-series").on("click", ".gif", function() {
    var status = $(this).attr("data-state");
    if (status === "pause") {
        $(this).attr("src", $(this).attr("data-play"));
        $(this).attr("data-state", "animate");
    
    } else {
        $(this).attr("src", $(this).attr("data-stop"));
        $(this).attr("data-state", "pause");
    }
});