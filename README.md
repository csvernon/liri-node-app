**Liri - Language Interpretation and Recognition Interface**


The purpose of this application is to allow a user to perform multiple different actions from the command line. Below they are listed.

  * *spotify-this-song*   --- (searches spotify for a given song)
  * *concert-this*        --- (searches bandsInTown for a given musicians concerts)
  * *movie-this*          --- (searches OMDB for a given movie)
  * *do-what-it-says*     --- (reads a command from a text file and executes it)
  
Commands are inputed in the following format 

**node liri.js movie-this interstellar**

For more examples please see the screenshots folder.


This application utilies 
* axios
* bandsintown
* dotenv
* jquery
* moment
* node.js
* node-omdb
* node-spotify-api

To use this application yourself, first you'll want to signup for a spotify dev account (it's free) and then clone this repository.  Inside of the appications root, you'll need to make a new .env file.  Inside it you will add your spotify api-key and SECRECT.  Once you have done that you will because to start giving the application commands in bash/terminal.

Your file should look like this.
`
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
`
