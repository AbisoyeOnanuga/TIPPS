# Import Flask and render_template
from flask import Flask, render_template

# Create an instance of Flask
app = Flask(__name__)

# Define a route for the root URL (/)
@app.route("/")
def index():
    # Return an HTML file with some variables
    return render_template("index.html", title="TIPPS Dropbox Sign API and AI", message="Analyse IP contracts")

# Run the app
if __name__ == "__main__":
    app.run()

