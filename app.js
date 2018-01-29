var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// omdb url information
var omdb_api_key = "&apikey=xxxxxxxxxx"; // Enter a valid api key here
var omdb_base_url = "http://www.omdbapi.com/";

// youtube url information
var youtube_api_key = "&key=xxxxxxxxxxxxxxxxxxxx"; // Enter a valid api key here
var url_youtube_search_1 = "https://www.googleapis.com/youtube/v3/search?part=id&q=";
var url_youtube_search_2 = "+trailer&type=video";

// error handling messages
var error_msg_1 = "Unable to find a match for movie search. Check movie title/spelling and try again";
var error_msg_2 = "Unable to get data from omdb.com for this movie.";

// Added to recongnise public folder
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    // get the data in 'search', from user input form
    var query = (req.query.search).trim();
    var url_omdb = omdb_base_url + "?s=" + query + omdb_api_key;

    request(url_omdb, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // Convert body string that is returned to an object
            var data = JSON.parse(body);

            if(data["Response"] == "False") {
                res.render("error", {error_msg: error_msg_1});
            } else {
                res.render("results", {data: data});
            }
        } else {
            res.render("error", {error_msg: error_msg_1});
        }
    });
});

app.get("/details", function(req, res) {
    // get the data in results
    var imdb_id = req.query.imdb_id;
    var url_omdb =  omdb_base_url + "?i=" + imdb_id + "&plot=full" + omdb_api_key;

    request(url_omdb, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // Convert body string that is returned to an object
            var movie_details = JSON.parse(body);

            var search_title = movie_details["Title"];
            var search_year = movie_details["Year"];
            var search_phrase = search_title + " " + search_year;
            var url_youtube = url_youtube_search_1 +
                                search_phrase + url_youtube_search_2 +
                                youtube_api_key;

            request(url_youtube, function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    // Convert body string that is returned to an object
                    var movie_data_youtube = JSON.parse(body)
                    res.render("details",
                                {movie_data_youtube: movie_data_youtube,
                                movie_details: movie_details});
                } else {
                    // this should be details with no youtube
                    res.render("error");
                }
            });
        } else {
            res.render("error", {error_msg: error_msg_2});
        }
    });
});


// app.listen(process.env.PORT || 5000);
app.listen(9000);

