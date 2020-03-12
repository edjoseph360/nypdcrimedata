from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import nypddatacollection


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/nypdcrime")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

 # Find one record of data from the mongo database
    destination_data = mongo.db.collection.find_one()

 # Return template and data
    return render_template("index.html", nypd=destination_data)


if __name__ == "__main__":
    app.run(debug=True)
