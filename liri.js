// Connect Spotify to the application
var Spotify = require("node-spotify-api");

// Connect `dotenv` to the application
require("dotenv").config();

// Set variables for dependencies and information from other modules
var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// Spotify constructor
function Spotify(id, secret) {
    this.id = id;
    this.secret = secret;
}

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

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
    // The following file can also be overwritten to provide concert or movie info.
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
            spotify
                .search({
                    type: 'track',
                    query: formattedInput
                })
                .then(function (response) {
                    var response = response.tracks.items[0];
                    console.log("\n");
                    console.log("Song Title: " + response.name + "\n");
                    var artists = [];
                    for (var i = 0; i < response.artists.length; i++) {
                        artists.push(response.artists[i].name);
                    };
                    console.log("Artist(s): " + artists + "\n");
                    console.log("Album: " + response.album.name + "\n");
                })
                .catch(function (err) {
                    console.log(err);
                });
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
        if (formattedInput == "") {
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + "mr+nobody")
                .then(function (response) {
                    movieOutput(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
                .then(function (response) {
                    movieOutput(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        break;
    case commandString.song:
        songOutput();
        break;
    case commandString.whatItSays:
        // Code for this instance is written above, so we can just break here
        break;
    default:
        // If the user enters nothing, the following message will appear
        console.log("\n");
        console.log("Please enter a command and something exciting to search!");
        break;

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

// Function for `spotify-this-song`; this function cannot be used for `do what it says` because the query value is different
function songOutput(response) {
    var songSearch = process.argv.slice(3).join(" ");
    if (songSearch == "") {
        // If no song is entered, the app defaults to "The Sign" by Ace of Base
        spotify.search({
                type: 'track',
                query: "The Sign"
            })
            .then(function (response) {
                var response = response.tracks.items[9];
                console.log("\n");
                console.log("Song Title: " + response.name + "\n");
                var artists = [];
                for (var i = 0; i < response.artists.length; i++) {
                    artists.push(response.artists[i].name);
                };
                console.log("Artist(s): " + artists + "\n");
                console.log("Album: " + response.album.name + "\n");
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({
                type: 'track',
                query: songSearch
            })
            .then(function (response) {
                var response = response.tracks.items[0];
                console.log("\n");
                console.log("Link to song preview: " + response.preview_url + "\n");
                console.log("Song Title: " + response.name + "\n");
                var artists = [];
                for (var i = 0; i < response.artists.length; i++) {
                    artists.push(response.artists[i].name);
                };
                console.log("Artist(s): " + artists + "\n");
                console.log("Album: " + response.album.name + "\n");
            })
            .catch(function (err) {
                console.log(err);
            });
    };
}

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