
//adding dotenv for api keys
require("dotenv").config();
//adding moment api from NPM
var moment = require("moment");
//adding spotify api keys
var keys = require("./keys.js");
//adding NPM spotify api
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
//adding FS
var fs = require("fs")
//the third thing written in CLI is the user's command
var userCommand = process.argv[2]
//everything after the third thing is the search term
var searchTerm = process.argv.splice(3).join("+")
//adding axios
var axios = require("axios")
//concert function:
function concertThis(band) {
    //do an axios pull for the bandsintown api
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
        .then(function (response) {//get json response
            //make a var for just the data portion of the response
            var data = response.data
            //if the array has information in it, do the following:
            if (data[0]) {
                console.log("\nYour band has the following upcoming events:\n")
                for (i = 0; i < data.length; i++) {
                    console.log((i + 1) + ".\n" + data[i].lineup + " is playing at \n" + data[i].venue.name + "\n" + "in " + data[i].venue.city + ", " + data[i].venue.region + "\n" + "on " + moment(data[i].datetime).format('LLLL') + "\n\n")
                }
            } else { console.log("Your band unfortunately has no upcoming events! :(") }


        })
}
function spotifySong(song) {
    spotify.search({
        type: 'track',
        query: song
    },
        function (err, data) {

            //if error:
            if (err) {
                return console.log('Error occured: ' + err);
            }
            //if something is returned:
            else if (data) {
                //ACE OF BASE
                //if no results:
                if (data.tracks.total == 0) {
                    //console log Ace of Base message
                    console.log("Unfortunately your song isn't listed! So we gave you Ace of Bass" + "\n" + "____________________" + "\n\n")
                    //then do a new search for ace of bass
                    spotifySong("ace of base the sign")
                }
                //if there are results
                else if (data.tracks.total > 0) {
                    //display the following
                    var items = data.tracks.items

                    var songName = items[0].name
                    var artist = items[0].artists[0].name
                    var album = items[0].album.name
                    var previewLink = items[0].preview_url
                    console.log("Song Info" + "\n" + "____________________" + "\n\n" + "The Artist of this Song is: " + artist + "\n\n" + "The Song's name is: " + songName + "\n\n" + "The album that the song is from is: " + album + "\n\n" + "Here is a preview link of the song: \n" + previewLink + "\n")

                }
            }
        });
}
function movie(movie) {
    if (movie) {
        //do an axios pull
        axios({
            method: 'get',
            url: 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie
        }).then(function (response) {
            // if it works, display the following:
            var data = response.data;
            if (!data.Error) {
                //movie title
                var title = data.Title;
                //movie release year
                var year = data.Year;
                //movie plot
                var plot = data.Plot;
                //movie actors
                var actors = data.Actors;
                //movie language
                var language = data.Language;
                //release country
                var country = data.Country;
                //movie ratings
                var ratings = data.Ratings
                console.log("Movie Info" + "\n" + "____________________" + "\n\n" + "The Title of this Film is: \n" + title + "\n\n" + "The Film was released in the year: \n" + year + "\n\n" + "The Film was rated as follows:\n")
                //put a for loop for all ratings inside of the CLI log:
                for (i = 0; i < ratings.length; i++) {
                    console.log("   " + ratings[i].Source + " rated it " + ratings[i].Value + "\n")
                }
                //continue displaying the information:
                console.log("The Film was produced in: \n" + country + "\n\n" + "The Film is available in the following languages: \n" + language + "\n\n" + "The Film had the following actors: \n" + actors + "\n\n" + "Plot summary: \n" + plot)
            }
            else { console.log("I'm sorry but your search returned nothing!") }
        })
    }
}
//log command for testing
if (userCommand == "log") {
    console.log(searchTerm)
}

//looking up concerts from bandsintown api
else if (userCommand == "concert-this") {
    concertThis(searchTerm);
}
//look up songs in spotify
else if (userCommand == "spotify-this-song") {
    spotifySong(searchTerm)
}
//if user command is movie-this:
else if (userCommand == "movie-this") {
    if (searchTerm) {
        movie(searchTerm)
    }
    else {
        movie("mr nobody")
    }
}
else if (userCommand == "do-what-it-says") {
    //read the file with the commands embedded
    fs.readFile('random.txt', 'utf8', function (err, data) {
        //if there's an error console log the error
        if (err) { console.log(err) }
        //otherwise:
        else {
            //split the text
            var nodeData = data.split(",");
            //and run the following:
            if (nodeData[0] == "concert-this") {
                concertThis(nodeData[1])
            }
            else if (nodeData[0] == "spotify-this-song") {
                spotifySong(nodeData[1])
            }
            else if (nodeData[0] == "movie-this") {
                movie(nodeData[1])
            }
        }
    })
}
else {
    console.log("User command not recognized")
}