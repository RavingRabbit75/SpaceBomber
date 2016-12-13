from flask import Flask, render_template, redirect, url_for
from flask_socketio import SocketIO, emit
import os

app=Flask(__name__)
socketio=SocketIO(app)


if os.environ.get("ENV") == "production":
	debug=False
	app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
	# app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')

else:
	debug=True
	app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
	# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/weather_animator'


@app.route("/")
def root():
	return render_template("index.html")

@socketio.on("connect")
def connect_handler():
	print("CONNECTION MADE")
	# return emit('new user', 'A new user has entered the chat!', broadcast=True)


@socketio.on("my stuff")
def handle_received_data(stuff):
	print(stuff["data"])
	someArray=[1,2,3,4,6,78]
	emit("stuff from home", {"crap": someArray})


@socketio.on("stuff from App")
def handle_received_data2(stuff):
	print("I got a present!: {}".format(stuff["data"]))