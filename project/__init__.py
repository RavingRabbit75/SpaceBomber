from flask import Flask, render_template, redirect, url_for, request
from flask_socketio import SocketIO, emit
from flask_modus import Modus
from flask_sqlalchemy import SQLAlchemy
import os


app=Flask(__name__)
socketio=SocketIO(app)


if os.environ.get("ENV") == "production":
	debug=False
	app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
	app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')

else:
	debug=True
	app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
	app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/space_bomber'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)


from project.games.models import Game


game_instances=[]


@app.route("/")
def root(game_id=None):
	if game_id is None:
		print("No game ID ===========================")
		game_id = Game.get_random_gameId()
		print("Game ID was made for you: {}".format(game_id))

	return render_template("index.html", game_id=game_id)


def get_game_byId(game_list, game_id):
	print("get_game_byId function called")
	for game in game_list:
		if game.game_id == game_id:
			return game
	
	return None



@app.route("/game/<string:game_id>", methods=["GET", "POST"])
def game(game_id):
	print("==============================")
	print(game_id)

	if request.method=="POST":
		if get_game_byId(game_instances, game_id)==None:
			game_instances.append(Game(request.form["username"], game_id))
			this_game = get_game_byId(game_instances, game_id)
			return render_template("game.html",p_name=this_game.player1, game_id=game_id, ready="no")

		else:
			this_game = get_game_byId(game_instances, game_id)	
			this_game.player2=request.form["username"]
			return render_template("game.html",p_name=this_game.player2, game_id=game_id, ready="yes")


	if request.method=="GET":
		this_game = get_game_byId(game_instances, game_id)
		if this_game.player1 and this_game.player2:
			print("Game full")
			return redirect("/")
		else:
			return render_template("index.html", game_id=game_id)



@socketio.on("connect")
def connect_handler():
	print("CONNECTION MADE Session Id: =================")
	print(request.sid)
	print(request.cookies.get("username"))
	print(request.cookies.get("game_id"))


@socketio.on("disconnect")
def disconnect_handler():
	print("CLIENT DISCONNECTED Session Id: =================")
	print(request.sid)
	


@socketio.on("get_previous_grid")
def get_previous_grid(payload):
	gameInstance = get_game_byId(game_instances, payload["game_id"])
	if gameInstance.player1 == payload["username"]:
		gameInstance.p1_sid = request.sid
		emit("reload_grid", {"player_ObjGrid":gameInstance.p1_ObjGrid}, room=gameInstance.p1_sid)
	elif gameInstance.player2 == payload["username"]:
		gameInstance.p2_sid = request.sid
		emit("reload_grid", {"player_ObjGrid":gameInstance.p2_ObjGrid}, room=gameInstance.p2_sid)


@socketio.on("init_p1_obj_grid")
def handle_received_data(stuff):
	gameInstance = get_game_byId(game_instances,stuff["game_id"])
	gameInstance.p1_ObjGrid = stuff["data"]
	gameInstance.p1_sid = request.sid


@socketio.on("second_player_ready")
def handle_second_player_ready(stuff):
	game_id = stuff["game_id"]
	gameInstance = get_game_byId(game_instances,stuff["game_id"])
	gameInstance.p2_ObjGrid = stuff["data"]
	gameInstance.p2_sid = request.sid
	sendPlayersOppData(game_id)


def sendPlayersOppData(game_id):
	gameInstance = get_game_byId(game_instances, game_id)
	gameInstance.set_p1_shipsDestroyed(0)
	gameInstance.set_p2_shipsDestroyed(0)
	emit("enemy", {"oppName":gameInstance.player2, "username":gameInstance.player1, "oppGrid":gameInstance.p2_ObjGrid}, room=gameInstance.p1_sid)
	emit("enemy", {"oppName":gameInstance.player1, "username":gameInstance.player2, "oppGrid":gameInstance.p1_ObjGrid}, room=gameInstance.p2_sid)
	setPlayerTurn("player1", game_id)


def setPlayerTurn(player, game_id):
	# waitingToStart, myTurn, enemyTurn, win, lose
	gameInstance = get_game_byId(game_instances, game_id)
	if player=="player1":
		emit("set_turn", "myTurn", room=gameInstance.p1_sid)
		emit("set_turn", "enemyTurn", room=gameInstance.p2_sid)
		gameInstance.set_currentPlayerTurn(0)
	elif player=="player2":
		emit("set_turn", "myTurn", room=gameInstance.p2_sid)
		emit("set_turn", "enemyTurn", room=gameInstance.p1_sid)
		gameInstance.set_currentPlayerTurn(1)


@socketio.on("current_player_clicked")
def current_player_clicked(payload):
	gameInstance = get_game_byId(game_instances, payload["game_id"])
	if gameInstance.get_currentPlayerTurn()==0:
		emit("set_opp_player_screen", {"id":payload["id"], "whosTurn":"myTurn"}, room=gameInstance.p2_sid)
		emit("set_turn", "enemyTurn", room=gameInstance.p1_sid)
		gameInstance.set_currentPlayerTurn(1)
	elif gameInstance.get_currentPlayerTurn()==1:
		emit("set_opp_player_screen", {"id":payload["id"], "whosTurn":"myTurn"}, room=gameInstance.p1_sid)
		emit("set_turn", "enemyTurn", room=gameInstance.p2_sid)
		gameInstance.set_currentPlayerTurn(0)



@socketio.on("ship_destroyed")
def update_ship_destroyed(payload):
	gameInstance = get_game_byId(game_instances, payload["game_id"])
	if gameInstance.p1_sid==request.sid:
		gameInstance.set_p1_shipsDestroyed(payload["shipsDC"])
		gameInstance.set_p1_HitGrid(payload["enemyGID"])
	elif gameInstance.p2_sid==request.sid:
		gameInstance.set_p2_shipsDestroyed(payload["shipsDC"])
		gameInstance.set_p2_HitGrid(payload["enemyGID"])

	if gameInstance.get_p1_shipsDestroyed()==3:
		emit("set_endGame", "win", room=gameInstance.p1_sid)
		emit("set_endGame", "lose", room=gameInstance.p2_sid)
	elif gameInstance.get_p2_shipsDestroyed()==3:
		emit("set_endGame", "lose", room=gameInstance.p1_sid)
		emit("set_endGame", "win", room=gameInstance.p2_sid)


@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404








