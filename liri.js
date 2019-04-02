// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// var command = process.argv[2];


// var commandString = {
//     concert: "concert-this",
//     song: "spotify-this-song",
//     movie: "movie-this",
//     whatItSays: "do-what-it-says"
// }

var nodeArg = process.argv;
var newArray = [];
var formattedInput = "";
for (var i = 2; i < nodeArg.length; i++) {
    newArray.push(nodeArg[i]);
    formattedInput = newArray.join("+");
}
console.log(newArray);
console.log(formattedInput);