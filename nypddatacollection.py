#!/usr/bin/env python
# coding: utf-8

# In[1]:


from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import urllib.request
import json 


# In[2]:


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/nypdcrime")


# In[3]:


data = ""
with urllib.request.urlopen("https://data.cityofnewyork.us/resource/uip8-fykc.json") as url:
    data = json.loads(url.read().decode())


# In[4]:


data[0]


# In[5]:


main_db=mongo.db.nypdcrime


# In[6]:


example_data = data[0]
#for data in data:
 #   example_data.append(data)


# In[7]:


for x in data:
    main_db.insert_one(x)


# In[ ]:





# In[ ]:




