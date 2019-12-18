# LIRI

The challenge for this project was to use Node JS to create a LIRI bot, like iPhone's SIRI. This version, however, takes in commands through the command line, instead of verbal commands. LIRI then takes in parameters and returns data based on one of four commands:

  * `concert-this`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

## Getting Started

- Clone down repo.
- Run command 'npm install' in Terminal or GitBash
- Run command 'node liri.js' or one of the commands below.

## Functionality Video
* click on image below for youtube video showcasing functionality. thanks for watching!
[![click here for youtube video](http://img.youtube.com/vi/66GtiBy-CPI/0.jpg)](http://www.youtube.com/watch?v=66GtiBy-CPI "LIRI")

## What Each Command Does

1. `node liri.js concert-this <band name>`

  * Displays upcoming concerts based on band name

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"The Sign" by Ace of Base

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * All Ratings that OMDB has for the movie
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
   

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command

## Tech used
- [Node.js](https://nodejs.org/en/)
- [Dotenv NPM Package](https://www.npmjs.com/package/dotenv)
- [MomentJS NPM Package](https://www.npmjs.com/package/moment)
- [Axios NPM Package](https://www.npmjs.com/package/axios)
- [Spotify NPM Package](https://www.npmjs.com/package/node-spotify-api)
- [Request NPM Package](https://www.npmjs.com/package/request)

## Prerequisites
```
- Node.js 
```
[Download the latest version of Node](https://nodejs.org/en/)
## Built With

* Visual Studio Code

## Authors
**Ariel Razon** [Ariel Razon](https://www.github.com/happyliltrees)
