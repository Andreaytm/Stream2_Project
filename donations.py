from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'USschooldonors')
COLLECTION_NAME = 'donations'


@app.route("/")
def index():
    """
    Flask view for main dashboard page
    """
    return render_template("index.html")

@app.route("/about")
def about():
    """
    About page
    """
    return render_template("about.html")


@app.route("/campaign")
def campaign():
    """
    Campaign page
    """
    return render_template("campaign.html")


@app.route("/donate")
def donate():
    """
    Donate page
    """
    return render_template("donate.html")


@app.route("/USdonors/donations")
def school_donors():
    """
    Flask view to serve project data from MongoDB in JSON format
    """

    # Constant to define the record fields that are to be retrieved
    FIELDS = {
        '_id': False, 'funding_status': True, 'school_state': True,
        'resource_type': True, 'poverty_level': True,
        'date_posted': True, 'total_donations': True,
        'primary_focus_area': True, 'primary_focus_subject': True,
        'teacher_teach_for_america': True, 'school_city': True, 'school_county': True,
        'students_reached': True, 'num_donors': True, 'grade_level': True
    }

    # Open a connection to MongoDB using a 'with' statement such that the
    # connection will close as soon as exit the 'with' statement
    with MongoClient(MONGO_URI) as conn:
        # Define wish to access collection: donations
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve result set only with fields defined in FIELDS, given count no need to limit results
        donations = collection.find(projection=FIELDS, limit=20000)
        # Convert donations to a list in a JSON object and return JSON data
        return json.dumps(list(donations))


if __name__ == "__main__":
    app.run(debug=True)
