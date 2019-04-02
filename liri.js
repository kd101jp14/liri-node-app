// connect `dotenv` to the application
require("dotenv").config();

// Set variables for dependencies and information from other modules
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// Set values to commands
var command = process.argv[2];
var commandString = {
    concert: "concert-this",
    song: "spotify-this-song",
    movie: "movie-this",
    whatItSays: "do-what-it-says"
}

// Allow the user to enter arguments longer than one word (Words are concatenated for URL in API calls)
var nodeArg = process.argv;
var newArray = [];
var formattedInput = "";
for (var i = 3; i < nodeArg.length; i++) {
    newArray.push(nodeArg[i]);
    formattedInput = newArray.join("+");
}

// The `do-what-it says` command results in a response based on the text written in `random.txt.`
if (command === commandString.whatItSays) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        formattedInput = dataArr[1];
        if (command === commandString.concert) {
            concertOutput();
        } else if (command === commandString.song) {
            command = commandString.song;
            return command;
        } else {
            command = commandString.movie;
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + formattedInput)
                .then(function (response) {
                    movieOutput(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    })
};

// Switch statements based on the the command entered by the user
switch (command) {
    case commandString.concert:
        concertOutput();
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

        // Pseudo code (since there was trouble getting authorization from Spotify)
        // 1. Take the formatted user input and assign it to song (ex: var song = formattedInput;)
        // 2. Using axios, make an API call, using the GET method and the search endpoint.
        //      Insert Spotify keys from the keys.js module and the song variable.
        // 3. Log the song's artist(s), song name, preview link of the song from Spotify, and the song's album.
        // 4. If no song is entered, the app defaults to "The Sign" by Ace of Base.


        // 
        // axios.get("https://accounts.spotify.com/authorize/client_id=" + keys.spotify.id +"&response_type=code&redirect_uri=http://localhost:8080/callback/")
        // axios.get("https://api.spotify.com/v1q=" + song + "&type=track")
        // .then(function (response) {
        //     console.log(response.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
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
};

// Function for `movie-this` command, `do-what-it-says` command, and the default (when no command or other arguments are entered by the user)
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

};

// Function for `concert-this` command and the `do-what-it-says` command
function concertOutput(response) {
    var artist = formattedInput;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("\n");
            console.log("Here are the next concert locations and dates!");
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
}