from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'schooldonors'
COLLECTION_NAME = 'donations'


@app.route("/")
def index():
    """
    Flask view for main dashboard page
    """
    return render_template("index.html")


@app.route("/donors/donations")
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
        'teacher_teach_for_america': True, 'grade_level': True
    }

    # Open a connection to MongoDB using a 'with' statement such that the
    # connection will close as soon as exit the 'with' statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define wish to access collection: donations
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve result set only with fields defined in FIELDS, given count no need to limit results
        donations = collection.find(projection=FIELDS, limit=20000)
        # Convert donations to a list in a JSON object and return JSON data
        return json.dumps(list(donations))


if __name__ == "__main__":
    app.run(debug=True)
