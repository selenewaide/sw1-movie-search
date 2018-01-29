# Movie Search Website

This project renders multiple web pages. The first page allows the user to enter a movie title (a word or phrase), to find a collection of movies that match. The second page is rendered on clicking the 'Search' button. This displays a selection of movie thumbnails that matched the search, using OMDB api. The user can get additional details about a movie by clicking on the 'Details' button in each thumbnail. This diplays another page with the movie trailer (using Youtube api), and movie trivia from OMDB.

## Table of Contents
1. Getting Started
2. Author
3. Acknowledgments
 

## 1. Getting Started

These instructions will get you a copy of the project. 

### Prerequisites

* node.js
* ejs
* express
* request
* [Youtube API key](https://developers.google.com/youtube/v3/getting-started) 
* [OMDB API key](http://www.omdbapi.com/apikey.aspx) 

### Install & Run

###### Step 1
Clone the project from [Github Movie Search Project.](https://github.com/selenewaide/sw1-movie-search.git)
```
git clone https://github.com/selenewaide/sw1-movie-search.git
```

###### Step 2
There are two variables at the top of the app.js file called omdb_api_key and youtube_api_key. The contents of these two variables needs to be amended with valid API keys obtained from OMDB and Youtube(v3).

###### Step 3
Run the app.js file to render the website - on localhost port 9000.
```
node app.js
```


## 2. Author

Selene Waide


## 3. Acknowledgments

Youtube and OMDB for use of their APIs.
