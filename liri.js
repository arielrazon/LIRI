//current to-do:
//get spotify api integration to work
//get omdb integration to work
//do-what-it-says
//create a nice readme.md file

require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

var fs = require("fs")
var userCommand = process.argv[2]
var searchTerm = process.argv.splice(3).join("+")
var axios = require("axios")

if (userCommand == "log") {
    console.log(searchTerm)
}
else if (userCommand == "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data
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
                    //then do a new search
                    spotify.search({
                        type: 'track',
                        query: 'the sign ace of base'
                    },

                        function (err, data) {
                            //if error:
                            if (err) {
                                return console.log('Error occured: ' + err);
                            }
                            //if new data, play ace of bass - with vars
                            if (data) {

                                var items = data.tracks.items

                                var songName = items[0].name
                                var artist = items[0].artists[0].name
                                var album = items[0].album.name
                                var previewLink = items[0].preview_url


                                console.log("The Song's name is: " + songName + "\n\n" + "This is the album that the song is from: " + album + "\n\n" + "Here is a preview link of the song: \n" + previewLink + "\n")
                            }
                        })


                }
                else if (data.tracks.total > 0) {

                    var items = data.tracks.items

                    var songName = items[0].name
                    var artist = items[0].artists[0].name
                    var album = items[0].album.name
                    var previewLink = items[0].preview_url
                    console.log(artist)
                    console.log("Song Info" + "\n" + "____________________" + "\n\n" + "The Artist of this Song is: " + artist + "\n\n" + "The Song's name is: " + songName + "\n\n" + "This is the album that the song is from: " + album + "\n\n" + "Here is a preview link of the song: \n" + previewLink + "\n")

                }
            }
        });
}
else if (userCommand == "movie-this") {

}
else if (userCommand == "do-what-it-says") {

}
else {
    console.log("User command not recognized")
}