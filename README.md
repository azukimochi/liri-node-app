# liri-node-app
This is a command line node application called LIRI.  

This node application was created using NodeJS, JavaScript, and NPM.  You will need to use your Terminal/Bash to make requests and retrieve responses. 

The creator of this application is azukimochi and she can be contacted via https://github.com/azukimochi.

Please ensure to download the entire repo in order to have access to the appropriate files.  Please ensure to install your own node modules and to create a .env file.  Please enter in your own keys into the .env file, ensuring it looks like below: 

# Spotify API keys

SPOTIFY_ID= <'insert yours'>
SPOTIFY_SECRET= <'insert yours'>

# Twitter API keys

TWITTER_CONSUMER_KEY= <'insert yours'>
TWITTER_CONSUMER_SECRET= <'insert yours'>
TWITTER_ACCESS_TOKEN_KEY= <'insert yours'>
TWITTER_ACCESS_TOKEN_SECRET= <'insert yours'>

___________________________________________________
HOW TO USE:

In your Terminal/Bash, you will need to enter in a specific command after 'node liri.js'.  Use one of the following:

-To search a movie: 'movie-this'  <'insert movie name'>

-To search a song: 'spotify-this-song'  <'insert song name'>

-To show your last 20 tweets: 'my-tweets' (remember to enter your own screen name into liri.js and your twitter developer details into .env!)

-To do what's in random.txt: 'do-what-it-says'

Each prompt will request information and give a response with details pertaining to your query.  When searching for a movie, you will get the movie's details from OMDB; when searching for a song, you'll get the song's details from Spotify, and when searching for your last 20 tweets, you'll get these tweet details from Twitter.  The command 'do-what-it-says' will make a request based on the text written in random.txt. 
