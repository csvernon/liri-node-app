require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require('fs');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var search = "";
for (i = 3; i < process.argv.length; i++) {
    search += process.argv[i];
    if (process.argv.length > 4) {
        search += " ";
    }
};
if (process.argv.length > 4) {
    search = search.slice(0, -1);
}

if (command == "spotify-this-song" && search == "") {
    search = "The Sign";
};
if (command == "spotify-this-song") {
    track(search)
};

if (command == "concert-this" && search == "") {
    search = "Backstreet Boys";
};
if (command == "concert-this") {
    concert(search)
};

if (command == "movie-this" && search == "") {
    search = "Mr. Nobody";
};
if (command == "movie-this") {
    omdb(search)
};

if (command == "do-what-it-says") {
    doWhatItSays();
};

function track(search) {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            console.log("Unfortunately we were unable to find " + search + ". Sorry about that!");
            return;
        }
        var song = data.tracks.items[0];
        for (i = 0; i < song.artists.length; i++) {
            console.log("Artist: " + song.artists[i].name);
            console.log("Title: " + song.name);
            console.log("Preview Link: " + song.preview_url);
            console.log("Album: " + song.album.name);
        }
    })
}

function concert(search) {
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Next concert for " + search);
            console.log("Name of the venue: ", response.data[0].venue.name);
            console.log("Venue location:", response.data[0].venue.city);
            var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log("Date of the Event:", eventDate);
        }
        )
        .catch(function (err) {
            console.log("We appear to have no concerts available for " + search + ". Sorry about that!")

        })
}

function omdb(search) {
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy&tomatoes=true&r=json")
        .then(function (response) {
            if (response.data.Title == undefined && response.data.year == undefined) {
                console.log("We appear to be unable to find the movie " + search + ". Sorry about that!")

            } else {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        })

}

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var random = data.split(',');
        console.log(random[0].toLowerCase())
        if (random[0].toLowerCase() == "spotify-this-song") {
            track(random[1])
        }
        if (random[0].toLowerCase() == "movie-this") {
            omdb(random[1])
        }
        if (random[0].toLowerCase() == "concert-this") {
            concert(random[1])
        }

    });
}