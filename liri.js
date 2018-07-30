require('dotenv').config();

var keys = require('./keys.js');
// console.log(keys);

//defining global variables
var activity = process.argv[2]; //to decide which API it will go through 
var song = "";
var movieName = "";

// _______Spotify search request_________________________________

// Grabbing what song the user wants to look up
function songInput() {
    var spotifyInput = process.argv;
    var space1 = spotifyInput.indexOf(process.argv[2]);
    song = spotifyInput.slice((space1+1), 20);
    song = song.join(" ");
    console.log("The song I searched for is: " + song);
}

// If the user doesn't input a song to search for, the default will be "The Sign" by Ace of Base
function defaultSong() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    // console.log(spotify);
    spotify.search({ type: 'track', query: song , limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //   console.log(JSON.stringify(data.tracks.items, null, 2));
        var dataArray = data.tracks.items;
        // console.log(dataArray[i]);
        console.log("\n_____________________________________");
        console.log("\nThe artist(s): " + dataArray[5].artists[0].name);
        console.log("\nThe song name:" + dataArray[5].name);
        console.log("\nThe album name: " + dataArray[5].album.name);
        console.log("\nThe preview link to the song from Spotify: " + dataArray[5].external_urls.spotify);
        
    });
    console.log("You didn't choose a song");
}

// searches Spotify for details of the song requested by the user 
function searchSpotify() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    // console.log(spotify);
    spotify.search({ type: 'track', query: song , limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //   console.log(JSON.stringify(data.tracks.items, null, 2));
        var dataArray = data.tracks.items;
        for (i = 0; i < dataArray.length; i++) {
            // console.log(dataArray[i]);
            console.log("\n_____________________________________");
            console.log("\nThe artist(s): " + dataArray[i].artists[0].name);
            console.log("\nThe song name:" + dataArray[i].name);
            console.log("\nThe album name: " + dataArray[i].album.name);
            console.log("\nThe preview link to the song from Spotify: " + dataArray[i].external_urls.spotify);
        }
    });
}

// ____________OMDB search request_______________________________________

// Grabbing what movie the user wants to look up
function movieInput() {
    var movieInput = process.argv;
    var space1 = movieInput.indexOf(process.argv[2]);
    movieName = movieInput.slice((space1+1), 20);
    movieName = movieName.join(" ");
    console.log("The movie I searched for is: " + movieName);
}

function searchOMDB() {
    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\n____________________________");
            // console.log(body); //to check information if code breaks
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("\nYear: " + JSON.parse(body).Year);
            console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("\nRotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("\nCountry of Production: " + JSON.parse(body).Country);
            console.log("\nLanguage: " + JSON.parse(body).Language);
            console.log("\nPlot: " + JSON.parse(body).Plot);
            console.log("\nActors: " + JSON.parse(body).Actors);
        }
    }); 
}

// _________Show my last 20 tweets_________________________________________________________
function searchTwitter() {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);
    // console.log(client);
    var screenName = { screen_name: 'aboozarmojdeh' }; //the user must switch this to their own screen name 
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@aboozarmojdeh: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
            }
        }
    });
}

// _____________Do what's written in random.txt___________________________________________________

function doWhatItSays() {
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        console.log("The data: " + data);
        var dataArr = data.split(",");
        // console.log(dataArr);
        var activity = dataArr[0];
        var searchQuery = dataArr[1];
        console.log("The activity: " + activity);
        console.log("The search query: " + searchQuery);

        if (activity == "spotify-this-song") {
            song = searchQuery;
            searchSpotify();
        }
        if (activity == "movie-this") {
            movieName = searchQuery;
            searchOMDB();
        }

        if (activity == "my-tweets") {
            searchTwitter();
        }
    });
}

// __________Checks what the user wants to do with the application________________________
function commandFunction() {
    
    // _______if the user wants to search a song_______
    if (activity == "spotify-this-song") {
        songInput();
        if (song == "") {
            song = "The Sign";
            defaultSong();
        } else {
            searchSpotify();   
        }   
    }
    
    // _______If the user wants to search a movie__________
    if (activity == 'movie-this') {
        movieInput();
        if (movieName == "") {
            movieName = "Mr.Nobody";
            searchOMDB();
            console.log("You didn't choose a movie to look up.");
        } else {
            searchOMDB();
        }
    }
    
    // ______If the user wants to search their tweets_________
    if (activity == 'my-tweets') {
        searchTwitter();
    }
    
    // _____Taking the command from the random.txt file______
    if (activity == "do-what-it-says") {
        doWhatItSays();
    }
}


commandFunction();