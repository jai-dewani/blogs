---
title: Hosting my Flask and Streamlit application on free tier Heroku
date: "2020-06-27T20:12:03.284Z"
description: "Here the steps I followed to host my application 'DeepNeuralNetwork' on free tier Heroku which uses Flask to run a keras model and serve an API and streamlit to create fast,clean and responsive UI"
---

In this blog I will be covering the steps I took to host my project 'DeepNeuralNetwork' on Heroku. I used Flask to power a keras model and serve its output as an API which I consumed using streamlit while create responsive, fast and clean UI

# A bit about Heroku  
Heroku uses container-based architecture to host apps. Which means you can easily scale up your apps, all you need to do is increase the number of containers to balance out the load! Everying in heroku is an **app** which can be deoployed to **[dyons](https://www.heroku.com/dynos)** which are basically light weight linux containers which can host your app.  
When you sign up with Heroku, you automatically get some free dyno hours, a sort of currency which can be used to run your apps in dynos. When your app runs, it consumes dyno hours. And when your app is idle for 30 minutes or more it automatically sleeps to stop consuming dyno hours. Don't worry it will take up automatically if you give it any task to do (might take a few seconds to warm up)

They also provide a free tier service and its main features are:
 - 550 Hours of dyno hours per month
 - After adding a credit card you will get +450 hours per month
 - Your monthly dyno hours can be shared by two or more apps
 - 1 dyno per app
 - 512 MB ram per dyno, which will be used to load all the extra packages you will be installing (This information will be useful afterwards).
 - Upto 5 free apps (without credit card) or 100 (with credit card)

`I'll be referring terminal on Linux/Mac and cmd on windows as terminal, so that is easy for me`

# Setting up Heroku CLI
I am assuming that you have made an account on Heroku.

Before starting any sort of deployment you need to setup heroku cli to be able to push your code directly to heroku from [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) after downloading and installing heroku cli, open your terminal/cmd and type
```
heroku login
```
which should promote you to login to heroku on a browser, after successfully loging in you shoud something like 
```
Logging in... done
Logged in as me@example.com
```
on your terminal. This means you have completed the 1<sup>st</sup> step of learning to host on heroku


# Hosting flask + keras model to Heroku
You will mainly need the following files to host your application on Heroku 
- app.py (core logic of your app)
- Procfile
- runtime.txt
- requirements.txt   
After which you will have to do the following steps
- Create an heroku app
- Pushing your code to heroku server

Follow the following steps to create these files

### Create your flask app mine loads a pre-trained model using a .h5 file and serves its outputs over an API  
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/backend/app.py?footer=minimal"></script>

### Create a new file *Procfile*  
Yes it has no extensions, so avoid adding any. The `Procfile` is used by heroku's dynos to understand what commands are to be run on start up of application. 
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/backend/Procfile?footer=minimal"></script>
The second part of the statment `app:app` specifies that the app file has to be run. Suppose if the name of main file would have been `index.py` we would have insted wrote 
```
web:gunirn index:app
```


### Create a *runtime.txt* 
This file is used to specify the python version we will be using in this dyno
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/backend/runtime.txt?footer=minimal"></script>

### Create a *requirements.txt*
It is used to store the pip modules that you have used and should be installed on your dyno to run your app smoothly. An example of my `requirements.txt` is
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/backend/requirements.txt?footer=minimal"></script>
**Changes**: You will have to uncomment `tensorflow==1.14.0` and `gunicorn`. Notice that I am using an old version of tensorflow 1.14.0 insted of latest ones 2.x.x because **size wise the latest tensorflow package is above 500 MB** which results in `slug size too large` errors while hosting your application on heroku as the max size of application heroku can allows is 500MB. Better to keep that in mind while creating your new app!

### Run the following commands which will create an app in your Heroku account
```
heroku create <your-app-name>
```

### Run the following commands to push your code to heroku server
```
git init 
git add .
git commit -m "<your-message>
git push heroku master
```

Congrats your Flask app is hosted on Heroku :tada:! You can now view your app on Heroku's daskboard and change its settings from there


### To Open your app on browser via terminal
Make sure you are on the root folder of your app 
```
heroku open
```

# Hosting Streamlit to Heroku
You will mainly need the following files to host your streamlit application on Heroku 
- app.py (core logic of your app)
- Procfile
- requirements.txt
- setup.sh  
After which you will have to do the following steps
- Create an heroku app
- Pushing your code to heroku server

### Creating your streamlit App 
Creating a streamlit app is quite simple as it emphasises and primarily used on python scripting behaviour. They also have cool demos you can build while learing on their [website](streamlit.io)  
My Streamlit application looks something like this
- Importing all my stuff
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/app.py?footer=minimal&&slice=0:6"></script>

- Decplring the URL of my server (you might wanna fill it with url of your own server)
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/app.py?footer=minimal&&slice=7:9"></script>

- Adding a title to my page and a sidebar where I will show my image 
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/app.py?footer=minimal&&slice=10:12"></script>

- If the button 'Get random predicition' is clicked' the following code section inside if-statment will run.  
Which sends a post request to the URL collects it output, reshapes the image to a square size and adds it to the side bar. The for loop creats a graphical view from the values of each nodes in different layers and plots it in the end
<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/app.py?footer=minimal&&slice=13:-0"></script>

### Creating a *Procfile*
Make sure to now add any extensions like '.txt' while creating the file. Here we are telling the dyno to first run our setup.sh file (which we will be creating after this) and start our streamlit server after that. Streamlit servers are started with the command `streamlit run <filename>`  
### Procfile:
```
web: sh setup.sh && streamlit run app.py
``` 

### Creating a *setup.sh* file
It helps us to create the necessary changes in the environment for our streamlit app to run smoothly

<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/setup.sh?footer=minimal"></script>

### Creating a *requirements.txt*
It is used to store the pip modules that you have used and should be installed on your dyno to run your app smoothly. Heroku will automatically install all the pip modules written in this file. Don't worry if you haven't written the exact version of your pip modules, just the name should be enough, Heroku will install the latest version matching that name. An example of my `requirements.txt` is

<script src="http://gist-it.appspot.com/https://github.com/jai-dewani/Visualize-Neural-Networks/blob/master/frontend/requirements.txt?footer=minimal"></script>

### Creating an App on Heroku
> I am assuming you have installed *heroku cli* and logged in using *heroku login*, if not follow the step given in the starting of this tutorial to setup heroku cli and login-in using your account.  
Create your app on heroku by typing
```
heroku create <your-app-name>
```

### Run the following commands to push your code to heroku server
```
git init 
git add .
git commit -m "<your-message>
git push heroku master
```

Congrats your Streamlit app is now hosted on Heroku :tada:! You can now view your app on Heroku's daskboard and change its settings from there


### To Open your app on browser via terminal
Make sure you are on the root folder of your app and run
```
heroku open
```  
***
Hope this helped you in hosting your Flask and Streamlit app on Heroku. Consider checking out my [Github Repo](https://github.com/jai-dewani/DeepNeural-Net-Visualiser) which contains all the code which was talked about in this tutorial