require('dotenv').config();
var request = require("request");

var keys = require('./keys.js');
// console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
// console.log(client);

//defining global variables
var activity = process.argv[2]; //to decide which API it will go through 
var song = "";
var movieName = "";

// Grabbing what song the user wants to look up
function songInput() {
    var spotifyInput = process.argv;
    var space1 = spotifyInput.indexOf(process.argv[2]);
    song = spotifyInput.slice((space1+1), 20);
    song = song.join(" ");
    console.log("The song I searched for is: " + song);
}

function movieInput() {
    var movieInput = process.argv;
    var space1 = movieInput.indexOf(process.argv[2]);
    movieName = movieInput.slice((space1+1), 20);
    movieName = movieName.join(" ");
    console.log("The movie I searched for is: " + movieName);
}


// _____________Start of the Spotify search request__________________

if (activity == "spotify-this-song") {
    songInput();
    // Still need to find the array index for Ace of Base 
    if (song == "") {
    //     spotify.search({ type: 'track', query: "The Sign" , limit: 10 }, function (err, data) {
    //         if (err) {
    //             return console.log('Error occurred: ' + err);
    //         }
    //           console.log(JSON.stringify(data.tracks.items, null, 2));
    //         // var dataArray = data.tracks.items;
    //         for (i = 0; i < dataArray.length; i++) {
    //             // console.log(dataArray[i]);
    //             console.log("_____________________________________");
    //             console.log("The artist(s): " + dataArray[i].artists[0].name);
    //             console.log("The song name:" + dataArray[i].name);
    //             console.log("The album name: " + dataArray[i].album.name);
    //             console.log("The preview link to the song from Spotify: " + dataArray[i].external_urls.spotify);
    //         }
    //     });
        console.log("You didn't choose a song");
    } else {
            spotify.search({ type: 'track', query: song , limit: 2 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                //   console.log(JSON.stringify(data.tracks.items, null, 2));
                var dataArray = data.tracks.items;
                for (i = 0; i < dataArray.length; i++) {
                    // console.log(dataArray[i]);
                    console.log("_____________________________________");
                    console.log("The artist(s): " + dataArray[i].artists[0].name);
                    console.log("The song name:" + dataArray[i].name);
                    console.log("The album name: " + dataArray[i].album.name);
                    console.log("The preview link to the song from Spotify: " + dataArray[i].external_urls.spotify);
                }
            });

    }

};
// ____________Start of the Twitter search request______________________________

if (activity == 'my-tweets') {
    var screenName = { screen_name: 'aboozarmojdeh' };
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

// ____________Start of the OMDB search request_____________________________________

if (activity == 'movie-this') {
    movieInput();
    if (movieName == "") {
        var movieName = "Mr.Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("\n____________________________");
                // console.log(body);
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
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("\n____________________________");
                // console.log(body);
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
}
// _____________Start of Do What It Says Search Query __________________________________

var fs = require('fs');

if (activity == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
       if (error) {
        console.log(error);
       } 
    
    //    Then print the contents of data
       console.log(data);
    
    //    Then we split the data by commas to make it more readable
       var dataArr = data.split(",");
       console.log(dataArr);
       activity = dataArr[0];
       song = dataArr[1];
       console.log(activity);
       console.log(song);
       spotify.search({ type: 'track', query: song , limit: 2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //   console.log(JSON.stringify(data.tracks.items, null, 2));
        var dataArray = data.tracks.items;
        for (i = 0; i < dataArray.length; i++) {
            // console.log(dataArray[i]);
            console.log("_____________________________________");
            console.log("The artist(s): " + dataArray[i].artists[0].name);
            console.log("The song name:" + dataArray[i].name);
            console.log("The album name: " + dataArray[i].album.name);
            console.log("The preview link to the song from Spotify: " + dataArray[i].external_urls.spotify);
        }
    });

    });


}



