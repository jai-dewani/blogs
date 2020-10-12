---
title: Creating Youtube Downloader using Youtube Data API v3
date: "2020-10-08T04:00:00.000Z"
description: "Ever wondered how a youtube downloader works? This is a blog which will help you create a simple youtube download using Node.js and HTML/CSS"
---
<!-- ![Interviewing](images/frustrated.jpg)

> Photo by [Tim Gouw](https://unsplash.com/@punttim?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/frustrated?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) -->

*Note: This blog is for educational purpose only*  

# Aim of the project 

- Allow our users to search for a specific youtube
- Display the list of videos with thumbnail and test corresponding to the search query 
- Provide a button to download the video

Lets begin with installing [Node](https://nodejs.org/en/), I'll recommend installing the recommended version. Npm comes preinstalled with Node which will help us to install 3rd party packages we need to build this project. 

## Initialize a node project

Run `npm init` to initialize a node project. You will be prompted to fill out some fields which will be reflected in the `package.json`, you can enter the information or just press enter to skip as you can always change these fields manually in `package.json`. The output should look something like this (package name depending on your root folder name)

```bash
This utility will walk you through creating a package.json file.
It only covers the most common items and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterward to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (trial)
version: (1.0.0)
description: A test project
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\Users\ASUS\Desktop\trial\package.json:

{
  "name": "trial",
  "version": "1.0.0",
  "description": "A test project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Installing all the required libraries 

Create a new folder and open your terminal in this new folder, and start installing these libraries one by one:

### body-parser
`npm install body-parser`  
body-parser is a middleware for parsing request body to easily access the information sent by the user via POST method in this application 

### dotenv
`npm install dotenv`  
It's a package that loads environment variables from a `.env` file into `process.env`

### ejs
`npm install ejs`  
Ejs is a dynamic rendering template that will be used to render dynamic data to show different videos depending on the search result.

### express
`npm install express`  
It's a framework for Node to ease the development of end-points/APIs while working with node

### request
`npm install request`  
Request will be used to make HTTP requests to get information from APIs. 

### youtube-dl
`npm install youtube-dl`  
It's the core library that allows us to download videos from youtube. 

### Or Install all of them in one command
`npm install body-parser dotenv ejs express request youtube-dl`  
*Pretty neat, huuh?*

## Creating a Youtube Data API v3 Key and setting up .env

- This API will be used to get a list of videos from youtube when the user searches for one.   
- Go to [Google APIs](https://console.developers.google.com/apis/library/youtube.googleapis.com) and Enable Youtube Data API v3 for a project to use it for searching 
- You should see a `Manage` button after enabling the API, click on it, and create a `Credential` which we will save in a .env file 
- Create a `.env` file that will be used to store all the credentials and things you shouldn't have directly on your codebase. The directory should now look something like this:  

```bash
.
├── .env
└── package.json
```

### /.env
Store your API Credentials in `.env` something like this  
```
APICREDENTIAL=your-key-here
```

## Creating index.js and a home page to search for videos

Create an index.js after which your directory should look something like 
```bash
.
├── index.js
├── .env
└── package.json
```

### /index.js | Import all the libraries needed 
```js
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var fs = require("fs");
var youtube = require("youtube-dl");
var dotenv = require("dotenv");
```

### /index.js | Set up project. 
We are setting view-engine, body-parser, public folder, .env cretentials and current directry location (this last one will be used later)
```js
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
dotenv.config();
var cwd = __dirname;
```

### /index.js | Create Root Routes
```js
app.get("/", function(req, res) {
    res.render("home");
});
```

### /index.js | Listing to Requests on localhost:8080
Make sure this section of code is always at the bottom-most part of your, it's not necessary but just a standard practice 
```js
var port = 8080;
app.listen(port, function(req, res) {
    const log = 
    console.log("The Server is up!\n" + 
                "Go to your favourite Web Browser and visit localhost:" 
                + String(port) + " to see the Application");
});
```

But before we can serve our index page we will need to create the page

## Creating views and public folder to store our VIEWS/EJS and CSS files

Create new files to match the following folder structure
```bash
.
├── index.js               
├── .env                 
├── package.json             
├── public                   
|   ├── leaves-pattern.png           
│   └── styles.css              
└── views                               
    ├── partials               
    │   ├── header.ejs         
    │   └── footer.ejs    
    ├── search.ejs             
    ├── started.ejs             
    └── home.ejs  
```

You can download the leaves-pattern.png from [here.](https://github.com/jai-dewani/umusic/raw/upstream/public/leaves-pattern.png) 

### /style.css
Since I am no expert in CSS have so I can only provide the code, though it's very simple and short and should be self-explanatory 
```css
input {
    width: 100%;
    padding: 1%;
}

.container {
    width: 70%;
}

#submitButton {
    width: 20%;
    margin: auto;
}

#search{
    padding-top: 20px;
    padding-bottom: 3%;
}

#brand, a:hover{
    margin: 0 !important;
    padding-top: 25px !important;
    text-decoration: none !important;
    color: black !important;
}

#footnote {
    text-align: center;
    margin-top: 10%;
    margin-bottom: 3%;
    font-family: "Signika", "sans-serif";
}

.fa-heart {
    color: red;
}

.dataField {
    margin-top: 5%;
    border-bottom: 2px solid black;
}

.col-md-5 {
    border: 1px solid white;
    border-right: 2px solid green;
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: center;
}

#download {
    color: white;
}

hr {
    border-top: 1px solid black;
}

h1 {
    font-family: "Acme", "sans-serif";
}

span {
    font-family: "Sedgwick Ave", "cursive";
}

body {
    background: url(/leaves-pattern.png);
}

#startedPage {
    text-align: center;
}
```

### /views/partials/header.ejs
Contains basic header of HTML with links to various CSS files that are needed
```html
<!DOCTYPE html>
<html>
    <head>
        <title>UMusic - Your Music Simplified</title>
        <link 
            rel="stylesheet" 
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link 
            rel="stylesheet" 
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
        <link 
            rel="stylesheet">
            href="https://fonts.googleapis.com/css?family=Acme|Signika|Sedgwick-Ave" 
        <link 
            rel="stylesheet" 
            href="/styles.css">
    </head>

    <body>
```

### /views/partials/footer.ejs
The footer section contains links to JS files with the closing body and HTML tag at the end.
```ejs
    <div class="container" id="footnote">
        <hr>
        Made with Web Technologies and <i class="fas fa-heart"></i> by 
        <a href="https://twitter.com/jai_dewani">
            <i class="fab fa-twitter"></i>Jai
        </a><br>
        Follow the code on <i class="fab fa-github"></i> 
        <a href="http://www.github.com/jai-dewani/umusic">GitHub</a>
    </div>
        
        <script src="https://code.jquery.com/jquery-3.3.1.min.js">
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">
        </script>
        <script src="script.js">
        </script>
    </body>
</html>
```

Don't forget to change my name, links to my twitter and GitHub account with yours ;)

### /views/home.ejs
A simple search bar to search your favorite youtube videos you wanna download 
```ejs
<%- include ('./partials/header') %>

<div class="jumbotron">
    <div class="container">
        <h1><i class="fas fa-headphones"></i> UMusic</h1>
        <p>Your favourite music downloads. <span>Simplified.</span></p>
    </div>
</div>

<div class="container" id="main">
    <form action="/search" method="POST" class="form-group">
        <div class="container" id="search">
            <input 
                type="text" 
                name="query" 
                placeholder="Find everything you ever wanted..." 
                class="form-control">
        </div>
        <div class="container" id="submitButton">
            <input 
                type="submit" 
                name="Let's Go!" 
                class="btn btn-primary form-control">
        </div>
    </form>
</div>
<%- include ('./partials/footer') %>

```


## Lets try running our project and see how it looks 

Running a node.js project is very simple, just run the following commands on the terminal at the root of your project directory
```bash
node index.js
```
Now go to your browser and open `localhost:8080` and hopefully you'll see something like 

![Index page](./images/index.JPG)

Make sure that you close the server by pressing `Ctrl + C` and restart it to any changes you make on `index.js`

## Creating a Search Route

### /index.js
```js
app.post("/search", function(req, res) {
    var query = req.body.query;
    var finalQuery = "";
    var i = 0;
    for (i = 0; i < query.length; i++) {
        if (query[i] !== " ") {
            finalQuery += query[i];
        }
        else {
            finalQuery += "+";
        }
    }
    
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" 
                + finalQuery 
                + "&key=" 
                + process.env.APICREDENTIAL;

    request(url, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        var data = JSON.parse(body);
        console.log(data);
        res.render("search", {data: data});
    });
});
```

### /views/search.ejs
A search page that will show the top 5 videos from your search result, you can increase the number of videos by changing the limit of `i` on `<% for (i = 0; i <= 4; i++) { %>`.
```js
<%- include ('./partials/header') %>

<div class="container">
    <div class="row">
        <div class="col-md-2">
            <a href="/">
                <h3 id="brand"><i class="fas fa-headphones"></i> UMusic</h3>
            </a>
        </div>
        <form action="/search" method="POST" class="form-group">
            <div class="col-md-6" id="search">
                <input 
                    type="text" 
                    name="query" 
                    placeholder="Find everything you ever wanted..." 
                    class="form-control">
            </div>
            <div class="col-md-2" id=search>
                <input 
                    type="submit" 
                    name="Let's Go!" 
                    class="btn btn-primary form-control">                
            </div>
        </form>
    </div>

    <% var i = 0;%>
    <% for (i = 0; i <= 4; i++) { %>
        <% if (data.items[i].id.kind === "youtube#video") { %>
            <div class="row dataField">
                <div class="col-md-5 img-thumbnail img-responsive">
                    <img src="<%= data.items[i].snippet.thumbnails.medium.url %>">
                </div>
                <div class="col-md-7">
                    <h3><%= data.items[i].snippet.title %></h3>
                    <p>
                        by 
                        <strong>
                            <%= data.items[i].snippet.channelTitle; %>
                        </strong>
                    </p>
                    <a id="download" 
                        href="/download/<%= data.items[i].id.videoId %>">
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Download Now!
                        </button>
                    </a>
                </div>
            </div>
            <br>
        <% } %>
    <% } %>
</div>

<%- include ('./partials/footer') %>
```

## Search page done, Lets check if it works or not 

Run your project and go to `localhost:8080` and try searching for something in the search bar. Hopefully, you'll see something like 

![Search Page](./images/search.JPG)

*Like what you see? Xd*

## Now, creating a route to download a youtube video. Excited? 

### creating a GET route to `/download/<video-url>`

```js
app.get("/download/:videoUrl", function(req, res) {
    var video = youtube("http://www.youtube.com/watch?v=" + req.params.videoUrl, 
    ["--format=18"],
    {cwd: cwd});

    video.on("info", function(info) {
        console.log("Download Started");
        if (info.track === null) {
            track = String(info.title + ".mp4");
        }
        else {
            track = String(info.track + ".mp4");
        }
        video.pipe(fs.createWriteStream(track));
        res.redirect("/started");
    });;
});

app.get("/started", function(req, res) {
    res.render("started");
});
```

Youtube-dl allows us to create an object which has many functions to be attached to Event names emitted by the object. We here are using the `video.on('info')` which is executed when the video object receives an `info` signal from youtube.
Inside which we are saving `track` and starting a download using `video.pipe(fs.createWriteStream(track));` while using node's standard file system `fs` library. Since the video is going to be a stream of data which is why we have used `fs.createWriteStream(track)` with the `track` as the file name. 

The extra route is to be redirected after you click the download button to a "Downloaded Successfully" page. But now we have to create this page. 

## views/started.ejs
```ejs
<%- include ('./partials/header') %>

<div class="container" id="startedPage">
    <h2>Your download has started!</h2>
    <br>
    <p>
        In the meanwhile, you can go back for more downloads 
        <br>
    </p>
    <div class="container">
        <a href="/"><h4>Get More Videos!</h4></a>
    </div>
</div>

<%- include ('./partials/footer') %>
```

## Done! Let's try downloading some videos

Run your Node server, try searching something, and click on download.  
### *Notice something weird?*  
The file is being downloaded in your project folder and not in your download location! You might have guessed it, but if not this is because of `cwd`, which we assigned as `__dirname` while setting up the project which takes the current location of the file which is index.js in your current directory. Good that we were able to find this problem, maybe I'll set my download folder in `cwd`. This should solve my problem. 

But there is another problem, after clicking the download button I don't get a prompt in my browser about a file downloading. Can you guess why is that? 

*Thinking*

That's because you aren't sending the file to the user, it's just being downloading in the backend which luckily is your system in this case so can access this download, but this won't work when you want to host this solution and let users download youtube videos in their system. It will just keep downloading the files on the server. 

## Allow userside downloads 
### index.js 
This is require just about 10 lines of changes in your `download/<video-url>` route 
```js
app.get("/download/:videoUrl", function(req, res) {
    var video = youtube("http://www.youtube.com/watch?v=" + req.params.videoUrl, 
    ["--format=18"],
    {cwd: cwd});
    var size, filename;

    video.on("info", function(info) {
        if (info.track === null) {
            track = String(info.title + ".mp4");
        }
        else {
            track = String(info.track + ".mp4");
        }
        size = info.size
        filename = info._filename
        res.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + filename,
            'Content-Type': 'video/mp4',
            'Content-Length': size
        });
    });;

    video.on('data',(data)=>{
        res.write(data)
    })

    video.on('end',(end)=>{
        res.end();
    })
});
```

The major changes are that in `video.on('info',)` we are just writing the head of our response with the file-type, name, and length. And we have added `video.on('data')` which is where we are taking the stream of data from youtube and sending to the user via `res` while closing the connection when the `video.on('end')` prompt is received to our `video` object

## Finally Done! I promise it's done 

Don't trust me? Turn on your server and start downloading, make sure to remember the Youtube Data API is free up to a limit so it won't be profitable to turning to host this for everyone unless the access is restricted to a group of people. 

## Done? Naah, there are so much more that can be one 

- [ ] Allow for a video option of quality to chose while downloading a video  
- [ ] Add feature to download whole playlists in a single click
- [ ] Allow users to directly submit a youtube video URL instead of searching to download videos

Think you can solve one of these problems? Feel free to contribute to this project [utkarsh-raj/umusic](https://github.com/utkarsh-raj/umusic) which has been used as a reference to write this blog.  