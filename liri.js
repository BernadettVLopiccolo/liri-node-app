var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
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
        spotify.search({
            type: 'track',
            query: 'All the Small Things'
        }, function(error, data) {
            if (!error) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name);

                    console.log("Song: " + songData.name);

                    console.log("Preview URL: " + songData.preview_url);

                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");


                    fs.appendFile('log.txt', songData.artists[0].name);
                    fs.appendFile('log.txt', songData.name);
                    fs.appendFile('log.txt', songData.preview_url);
                    fs.appendFile('log.txt', songData.album.name);
                    fs.appendFile('log.txt', "-----------------------");

                }
            } else {
                return console.log('Error occurred! ' + error);
            }

            console.log(data);
        });
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

else if (command === 'spotiy-this-song') {
    mySongs();
}



