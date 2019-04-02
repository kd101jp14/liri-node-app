// require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];


var commandString = {
    concert: "concert-this",
    song: "spotify-this-song",
    movie: "movie-this",
    whatItSays: "do-what-it-says"
}

var nodeArg = process.argv;
var newArray = [];
var formattedInput = "";
for (var i = 3; i < nodeArg.length; i++) {
    newArray.push(nodeArg[i]);
    formattedInput = newArray.join("+");
}
console.log(command);
console.log(newArray);
console.log(formattedInput);

var axios = require("axios");
var moment = require("moment");

switch (command) {
    case commandString.concert:
        var artist = formattedInput;
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("\n");
                console.log("Here are the next concert locations and dates for " + artist + "!");
                console.log("\n");
                for (var i = 0; i < response.data.length; i++) {
                    var date = response.data[i].datetime;
                    var format = "L";
                    var formattedDate = moment(date).format(format);
                    console.log(formattedDate + ": " + response.data[i].venue.name + " in " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        break;
    case commandString.movie:
        var movie = formattedInput;
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
            .then(function (response) {
                movieOutput(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        break;
    case commandString.song:
        var song = formattedInput;
        axios.get("https://api.spotify.com/v1q=" + song + ":abacab&type=track")
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        break;
    case commandString.whatItSays:
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
        })
        break;
    default:
        {
            var movie = formattedInput;
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + "mr+nobody")
            .then(function (response) {
                movieOutput(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            break;
        };
}

function movieOutput(response) {
    console.log("\n");
    console.log("The movie " + response.data.Title + " was released in " + response.data.Year + ".");
    console.log("\n");
    console.log("Its IMDB rating is " + response.data.Ratings[0].Value + ", while its Rotten Tomatoes rating is " + response.data.Ratings[1].Value + ".");
    console.log("\n");
    console.log("This movie was produced in " + response.data.Country + ".");
    console.log("\n");
    console.log("Movie Language(s): " + response.data.Language + ".");
    console.log("\n");
    console.log("Plot: " + response.data.Plot);
    console.log("\n");
    console.log("This movie's actors include " + response.data.Actors + ".");
  
}