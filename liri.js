var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var fs = require("fs");
var nodeArgv = process.argv;
var command = process.argv[2];
var params = {
    count: '20',
    screen_name: 'BettiLopiccolo',
    };

console.log('liri has loaded');
fs.readFile('random.txt', "utf8", function(err, data) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("data", data);
    }
  });

    var myTweets = function() {
        var client = new twitter(keys.twitterKeys);
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
            	for (var i = 0; i < tweets.length; i++) {
            		// console.log(tweets[i].text + "Created on: " + tweets[i].created_at + "\n");
                    // console.log(JSON.stringify(tweets, null, 2));
                    console.log(tweets[i].text);
            	}
            	 fs.appendFile("log.txt", "-------------------");
            } else {
              return console.log('Error occurred! ', + error);
            }

        });
    }
      var mySongs = function() {
         var spotify = new spotify({
        id: '4c7b624ef3ff4285b4642f2b524c31ef',
        secret: '38fbfad387c340308eea209ffaf72aba'
    });

    if (userRequest == null) {
        userRequest = 'The Sign';
    }
    
    spotify.search({ type: 'track', query: userRequest }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // caching for perfromance improvement
        var tracks = data.tracks.items[0];
        console.log("Artist(s): ", tracks.artists[0].name);
        console.log("Song: ", tracks.name);
        console.log('Preview Link: ' + tracks.preview_url);
        console.log('Album: ' + tracks.album.name);
        console.log(' ');
        fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() +'\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + tracks.artists[0].name + '\r\nSong: ' + tracks.name + '\r\nPreview Link: ' + tracks.preview_url + '\r\nAlbum: ' + tracks.album.name + '\r\n=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
            if (err) throw err;
        });

    });
  //        var spotify = new spotify({
  //           client_id: '4c7b624ef3ff4285b4642f2b524c31ef',
  // client_secret: '38fbfad387c340308eea209ffaf72aba'
  //        });
  //        console.log("why", spotify);
  //       var song = process.argv[3];
  //       spotify.search({
  //           type: 'track',
  //           query: song
  //       }, function(error, data) {
  //           console.log("5555", data);
  //           if (!error) {

  //                 // for (var i = 0; i < data.tracks.items.length; i++) {
  //                   console.log("77777", data.tracks);
  //                   var songData = data.tracks.items[0];
  //                   console.log("Artist: " + songData.artists[0].name);

  //                   console.log("Song: " + songData.name);

  //                   console.log("Preview URL: " + songData.preview_url);

  //                   console.log("Album: " + songData.album.name);
  //                   console.log("-----------------------");


  //                   fs.appendFile('log.txt', songData.artists[0].name);
  //                   fs.appendFile('log.txt', songData.name);
  //                   fs.appendFile('log.txt', songData.preview_url);
  //                   fs.appendFile('log.txt', songData.album.name);
  //                   fs.appendFile('log.txt', "-----------------------");

  //                // }
  //           } else {
  //               return console.log('Error occurred! ' + error);
  //           }

  //           // console.log(data);
  //       });
    }

var movieThis = function() {
	var queryInput = "Mr. Nobody";

	if (process.argv[3] !== undefined) {
	    queryInput = process.argv[3];
	}
	request(keys.omdbapiKeys.url + queryInput + '&tomatoes=true&apikey=' + keys.omdbapiKeys.apiKey, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log(movieData);
            console.log("Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("Rotten Tomatoes Rating: " + movieData.tomatoRating);
            console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);

            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + movieData.Title);
            fs.appendFile('log.txt', "Release Year: " + movieData.Year);
            fs.appendFile('log.txt', "IMDB Rating: " + movieData.imdbRating);
            fs.appendFile('log.txt', "Country: " + movieData.Country);
            fs.appendFile('log.txt', "Language: " + movieData.Language);
            fs.appendFile('log.txt', "Plot: " + movieData.Plot);
            fs.appendFile('log.txt', "Actors: " + movieData.Actors);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + movieData.tomatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + movieData.tomatoURL);

        } else {
           return console.log('Error occurred! ', + error);
        }
    });
}

if (command === 'movie-this') {
	movieThis();
}

else if (command === 'my-tweets') {
    myTweets();
}

else if (command === 'spotify-this-song') {
    mySongs();
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    });
}



