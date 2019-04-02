# LIRI Node App

## Contributors
- kd101jp14

## About
LIRI (Language Interpretation and Recognition Interface) is a command line Node app that takes in parameters and provides data based on those parameters. It is similar to the iPhone's SIRI. However, it takes input from the command line instead of taking in voice commands.

## The Challenge
The main challenge of this project was creating multiple types of requests to different APIs and returning the responses from those APIs, based on the user's command and input in the command line. I overcame this challenge by creating an object for the different commands and then by creating switch statements based on those commands. For example, if the user enters `node liri.js movie-this Toy Story`, the code will know that since the command `movie-this` was used, the apporpriate action is to make an API call to the OMDB API and return information about the movie "Toy Story."

## How to run this application:
- Clone this repository to your computer.
- Install Node.js.
- Go to the `liri.js` file in your CLI and enter `npm install.`
- Note: You must supply your own `.env` file for this application to work.

There are four commands:
1. `node liri.js concert-this <artist/band name here>`
    This command will provide upcoming concert dates and event locations for the artists/band entered.

2. `node liri.js spotify-this-song '<song name here>'`
    This command will provide information about the song title entered.

3. `node liri.js movie-this '<movie name here>'`
    This command will provide information about the movie title entered.

4. `node liri.js do-what-it-says`
    This command will provide random information about an artist/band, song, or movie.

Note: `node liri.js`
    Without a command, LIRI will provide information about the movie "Mr. Nobody."

## Technologies Used
- CLI (Git Bash)
- Node.js
- Javascript
- Axios
- Moment.js
- Bands in Town API
- Spotify API
- OMDB (Open Movie Database) API

## Preview
![LIRI gif](#)

## License

This project does not have a license and is not currently open for contributions. Suggestions are welcome.

## Contact
- davis.kyra@rocketmail.com
