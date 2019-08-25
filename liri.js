
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
//log command for testing
if (userCommand == "log") {
    console.log(searchTerm)
}
//looking up concerts from bandsintown api
else if (userCommand == "concert-this") {
    //axios pull from bandsintown api with user's searchTerm
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //cleaner way to pull JSON response
            var data = response.data
            //if the array has information in it, do the following:
            if (data[0]) {
                console.log("Your band has the following upcoming events:")
                for (i = 0; i < data.length; i++) {
                    console.log((i + 1) + ". " + data[i].lineup + " is playing at \n" + data[i].venue.name + "\n" + "in " + data[i].venue.city + ", " + data[i].venue.region + "\n" + "on " + moment(data[i].datetime).format('LLLL') + "\n")
                }
            } else { console.log("Your band unfortunately has no upcoming events! :(") }


        })
        .catch(function (error) { console.log(error) });

}
else if (userCommand == "spotify-this-song") {
    //initial spotify search
    spotify.search({
        type: 'track',
        query: searchTerm
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
                    spotify.search({
                        type: 'track',
                        query: 'the sign ace of base'
                    },

                        function (err, data) {
                            //if error:
                            if (err) {
                                return console.log('Error occured: ' + err);
                            }
                            //if new data, play ace of bass
                            if (data) {

                                var items = data.tracks.items

                                var songName = items[0].name
                                var artist = items[0].artists[0].name
                                var album = items[0].album.name
                                var previewLink = items[0].preview_url


                                console.log("The Artist of this Song is: " + artist + "\n\n" + "The Song's name is: " + songName + "\n\n" + "The album that the song is from is: " + album + "\n\n" + "Here is a preview link of the song: \n" + previewLink + "\n")
                            }
                        })


                }
                //if there are results
                else if (data.tracks.total > 0) {
                    //display the following
                    var items = data.tracks.items

                    var songName = items[0].name
                    var artist = items[0].artists[0].name
                    var album = items[0].album.name
                    var previewLink = items[0].preview_url
                    console.log(artist)
                    console.log("Song Info" + "\n" + "____________________" + "\n\n" + "The Artist of this Song is: " + artist + "\n\n" + "The Song's name is: " + songName + "\n\n" + "The album that the song is from is: " + album + "\n\n" + "Here is a preview link of the song: \n" + previewLink + "\n")

                }
            }
        });
}
//if user command is movie-this:
else if (userCommand == "movie-this") {
    //if the user inputs a searchterm:
    if (searchTerm) {
        //do an axios pull
        axios({
            method: 'get',
            url: 'http://www.omdbapi.com/?apikey=trilogy&t=' + searchTerm
        }).then(function (response) {
            // if it works, display the following:
            var data = response.data;
            if (!data.Error) {
                console.log(data)
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
    //if user has no input at all, then
    else {
        axios({
            method: 'get',
            //display mr nobody
            url: 'http://www.omdbapi.com/?apikey=trilogy&t=Mr+Nobody'
        }).then(function (response) {
            var data = response.data;
            var title = data.Title;
            var year = data.Year;
            var plot = data.Plot;
            var actors = data.Actors;
            var language = data.Language;
            var country = data.Country;
            var ratings = data.Ratings
            console.log("You didn't enter a movie! So we'll give you information on Mr. Nobody.\n\n" + "Movie Info" + "\n" + "____________________" + "\n\n" + "The Title of this Film is: \n" + title + "\n\n" + "The Film was released in the year: \n" + year + "\n\n" + "The Film was rated as follows:\n")
            for (i = 0; i < ratings.length; i++) {
                console.log("   " + ratings[i].Source + " rated it " + ratings[i].Value + "\n")
            }
            console.log("The Film was produced in: \n" + country + "\n\n" + "The Film is available in the following languages: \n" + language + "\n\n" + "The Film had the following actors: \n" + actors + "\n\n" + "Plot summary: \n" + plot)

        })
    }
}
else if (userCommand == "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) { console.log(err) }
        else { console.log(data) }
    })
}
else {
    console.log("User command not recognized")
}