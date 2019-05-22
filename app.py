# import necessary libraries
from sqlalchemy import func
import pandas as pd
import sqlite3 as sql

from flask import (
    Flask,
    render_template,
    jsonify,
    redirect,
    request)

from flask_sqlalchemy import SQLAlchemy
# from functions.sqlquery import sql_query

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///happiness.sqlite"

db = SQLAlchemy(app)

class Happiness(db.Model):
    __tablename__ = 'happiness'
    # index BIGINT
    Country_ID = db.Column(db.Integer, primary_key=True)
    Country = db.Column(db.String)
    Abbr = db.Column(db.String)
    Abbr_three = db.Column(db.String)
    Region = db.Column(db.String)
    Happiness_Rank = db.Column(db.Float)
    Happiness_Score = db.Column(db.Float)
    Whisker_high = db.Column(db.Float)
    Whisker_low = db.Column(db.Float)
    Economy_GDP_per_Capita = db.Column(db.Float)
    Family = db.Column(db.Float)
    Health_Life_Expectancy = db.Column(db.Float)
    Freedom = db.Column(db.Float)
    Generosity = db.Column(db.Float)
    Trust_Government_Corruption = db.Column(db.Float)
    Dystopia_Residual = db.Column(db.Float)
    Lat = db.Column(db.Float)
    Lng = db.Column(db.Float)

    def __repr__(self):
        return '<Happiness %r>' % (self.Country)


# Create database classes
@app.before_first_request
def setup():
    # Recreate database each time for demo
    db.drop_all()
    db.create_all()


# Create a route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and return the jsonified results
@app.route("/data")
def data():
    conn = sql.connect('db/happiness.db')
    df = pd.read_sql_query('select * from happiness;', conn)
    return df.to_json()

# @app.route("/data")
# def data():
#     results = db.session.query(happiness).all()
#     df = pd.DataFrame(results)
#     return jsonify(df.to_dict(orient="records"))
    
# @app.route("/data")
# def data():
#     sel = [func.strftime("%Y", Happiness)]
#     results = db.session.query(*sel).all()
#         #group_by(func.strftime("%Y", Happiness)).all()
#     df = pd.DataFrame(results)
#     return jsonify(df.to_dict(orient="records"))


# Query the database and return the jsonified results
# @app.route("/data_files")
# def sql_database():
#     import pandas as pd
#     results = pd.read_sql_query(''' SELECT * FROM data_table''')
#     msg = 'SELECT * FROM data_table'
#     return render_template('index.html', results = results, msg=msg)



if __name__ == "__main__":
    app.run(debug=True)