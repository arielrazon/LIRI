//current to-do:
//fix MOMENT JS - figure out how to format the time
//

require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var fs = require("fs")
var userCommand = process.argv[2]
var searchTerm = process.argv.splice(3).join("")
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

}
else if (userCommand == "movie-this") {

}
else if (userCommand == "do-what-it-says") {

}
else {
    console.log("User command not recognized")
}