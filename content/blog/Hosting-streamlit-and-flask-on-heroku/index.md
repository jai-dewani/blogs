---
title: Hosting my Flask and Streamlit application on free tier Heroku
date: "2020-06-28T15:12:03.284Z"
description: "In this blog I will be discussing the steps I followed to host my application 'DeepNeuralNetwork' on free tier Heroku which uses Flask to run a keras model and serves an API and streamlit to create clean, fast and responsive UI"
---

In this blog I will be covering the steps I took to host my project '[DeepNeuralNetwork](https://github.com/jai-dewani/DeepNeural-Net-Visualiser)' on Heroku. I used Flask to power a keras model and serve its output as an API which I consumed using streamlit while create responsive, fast and clean UI

# A bit about Heroku  
Everying in heroku is an **app** which can be deoployed to **[dyons](https://www.heroku.com/dynos)** which are basically light weight linux containers which can host your app It uses container-based architecture to host apps, which means you can easily scale up your apps by increase the number of containers to balance out the load!  
When you sign up with Heroku, you automatically get some free dyno hours, a sort of currency which can be used to run your apps in dynos. When your app runs, it consumes dyno hours. And when your app is idle for 30 minutes or more it automatically sleeps to stop consuming dyno hours. Don't worry it will take up automatically if you give it any task to do (might take a few seconds to warm up)

They also provide a free tier service and its main features are:
 - 550 Hours of dyno hours per month
 - After adding a credit card you will get +450 hours per month
 - Your monthly dyno hours can be shared by two or more apps
 - 1 dyno per app
 - 512 MB ram per dyno, which will be used to load all the extra packages you will be installing (This information will be useful afterwards).
 - Upto 5 free apps (without credit card) or 100 (with credit card)

*I'll be referring terminal on Linux/Mac and cmd on windows as terminal, so that is easy for me*  

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


# Hosting flask + keras model
You will mainly need the following files to host your application on Heroku 
- app.py (core logic of your app)
- Procfile
- runtime.txt
- requirements.txt     

After which you will have to do the following steps
- Create an heroku app
- Pushing your code to heroku server


### Create your flask app  
Mine loads a pre-trained model using a .h5 file and serves its outputs over an API. All the code snipits in this section are part of a same file *app.py* in the order given bellow
- Importing all the necessary stuff 
```
import json
import tensorflow as tf 
import numpy as np 
import random 
from flask import Flask, request
```

- Loading my pre-trained MNSIT model from *model.h5* 
```
model = tf.keras.models.load_model('model.h5')
feature_model = tf.keras.models.Model(
	model.inputs,
	[layer.output for layer in model.layers]
)
_, (x_test, _ ) = tf.keras.datasets.mnist.load_data()
x_test = x_test/255
def get_prediction():
	index = np.random.choice(x_test.shape[0])
	image = x_test[index, :, :]
	image_arr = np.reshape(image, (1, 784))
	return feature_model.predict(image_arr), image
```

- Using flask to create a API which serves values from each node of different layers in my model 
```
app = Flask(__name__)
@app.route('/', methods=['GET','POST'])
def index():
    if request.method == "POST":
        preds, image = get_prediction()
        final_preds = [p.tolist() for p in preds]
        return json.dumps({
            'prediction': final_preds,
            'image': image.tolist()
        })
    return "Welcome to Neural Network Visualization"
if __name__=="__main__":
    app.run()
```

### Create *Procfile*  
Yes it has no extensions, so avoid adding any. The `Procfile` is used by heroku's dynos to understand what commands are to be run on start up of application. 
```
web:gunicorn app:app
```
The second part of the statment `app:app` specifies that the app file has to be run. Suppose if the name of main file would have been `index.py` we would have insted wrote 
```
web:gunirn index:app
```

### Create a *runtime.txt* 
This file is used to specify the python version we will be using in this dyno.
```
python-3.7.6
```

### Create a *requirements.txt*
It is used to store the pip modules that you have used and should be installed on your dyno to run your app smoothly. Don't worry if you haven't written the exact version of your pip modules, just the name should be enough, Heroku will install the latest version matching that name.  
An example of my `requirements.txt` is
```
tensorflow==1.14.0 
numpy==1.18.1
json5==0.9.1
Flask==1.1.1
gunicorn
```
**Notice:** that I am using an old version of tensorflow 1.14.0 insted of latest ones 2.x.x because **size wise the latest tensorflow package is above 500 MB** which results in `slug size too large` errors while hosting your application on heroku as the max size of application heroku can allows is 500MB. Better to keep that in mind while creating your new app!

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
```
import streamlit as st
import json
import requests
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
import numpy as np 
```
- Decplring the URL of my server (you might wanna fill it with url of your own server)
```
# Url of your Flask server
URL = '' 
```
- Adding a title to my page and a sidebar where I will show my image 
```
st.title('Neural Network Visualizer')
st.sidebar.markdown('## Input Image')
```

- If the button 'Get random predicition' is clicked' the following code section inside if-statment will run.  
Which sends a post request to the URL collects it output, reshapes the image to a square size and adds it to the side bar. The for loop creats a graphical view from the values of each nodes in different layers and plots it in the end
```
if st.button('Get random prediction'):
        response = requests.post(URL, data={})
        response = json.loads(response.text)
        preds = response.get('prediction')
        image = response.get('image')
        image = np.reshape(image, (28,28))
        st.sidebar.image(image, width=150)
        # print(preds)
        for layer, p in enumerate(preds):
                # print(layer,p)
                numbers = np.squeeze(np.array(p))
                plt.figure(figsize=(32,6))
                if layer == 2:
                        row = 1
                        col = 10
                else:
                        row = 2
                        col = 16
                for i, number in enumerate(numbers):
                        plt.subplot(row,col,i+1)
                        plt.imshow(number * np.ones((8,8,3)).astype('float32'))
                        plt.xticks([])
                        plt.yticks([])
                        if layer == 2:
                                plt.xlabel(str(i), fontsize=40)
                plt.subplots_adjust(wspace=0.05, hspace=0.05)
                plt.tight_layout()
                st.text('Layer {}'.format(layer+1))
                st.pyplot()
```

### Creating a *Procfile*
Make sure to now add any extensions like '.txt' while creating the file. Here we are telling the dyno to first run our setup.sh file (which we will be creating after this) and start our streamlit server after that. Streamlit servers are started with the command `streamlit run <filename>`  
### Procfile:
```
web: sh setup.sh && streamlit run app.py
``` 

### Creating a *setup.sh* file
It helps us to create the necessary changes in the environment for our streamlit app to run smoothly
```
echo "\
[server]\n\
headless = true\n\
port = $PORT\n\
enableCORS = false\n\
\n\
" > ~/.streamlit/config.toml
```

### Creating a *requirements.txt*
It is used to store the pip modules that you have used and should be installed on your dyno to run your app smoothly. Heroku will automatically install all the pip modules written in this file. Don't worry if you haven't written the exact version of your pip modules, just the name should be enough, Heroku will install the latest version matching that name. An example of my `requirements.txt` is

```
numpy==1.18.1
json5==0.9.1
jsonschema==3.2.0
streamlit==0.61.0
matplotlib==3.1.3
```

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