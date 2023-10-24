# app.py
import os
import dropbox
import dropbox_sign
from flask import Flask, request, render_template

from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
APP_KEY = os.getenv("APP_KEY")
APP_SECRET = os.getenv("APP_SECRET")

# Create an instance of Flask
app = Flask(__name__)

# Define a route for the root URL (/)
@app.route("/")
def index():
    # Return an HTML file with some variables
    return render_template("index.html", title="TIPPS Dropbox Sign API and AI", message="Analyse IP", os=os)

# Run the app
if __name__ == "__main__":
    app.run()

# Create a Dropbox object with the refresh token
dbx = dropbox.Dropbox(
    #oauth2_refresh_token=REFRESH_TOKEN,#
    app_key=APP_KEY,
    app_secret=APP_SECRET,
)