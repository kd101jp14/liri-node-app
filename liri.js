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

switch (command) {
    case commandString.concert:
    var artist = formattedInput;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    case commandString.movie:
    var movie = formattedInput; 
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    default: {
        var movie = formattedInput; 
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + "mr+nobody")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    }
    
}