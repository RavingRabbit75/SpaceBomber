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


player_queue=[]
game_instances=[]


print(Game.get_random_game_id())

# 0 is p1, 1 is p2
playerslots=[False,False]
playerNames=["",""]
playerSessionIds=[]
gameData={
	"p1_ObjGrid":[],
	"p2_ObjGrid":[],
	"p1_HitMissGrid":[],
	"p2_HitMissGrid":[],
	"shipsDestroyed":[0,0],
	"turnNumber":0,
	"currentPlayerTurn":0
}

@app.route("/")
def root():
	return render_template("index.html")


@app.route("/game")
def game():
	if playerslots[0] and playerslots[1]:
		return redirect("/")

	if playerslots[0]==False:
		playerslots[0]=True
		playerNames[0]=request.args.get("username")
		return render_template("game.html",p_name=playerNames[0],ready="no")
	elif playerslots[1]==False:
		playerslots[1]=True
		playerNames[1]=request.args.get("username")
		return render_template("game.html",p_name=playerNames[1],ready="yes")



# @socketio.on("connect")
# def connect_handler():
# 	print("CONNECTION MADE: ")
# 	playerSessionIds.append(request.sid)
# 	print(playerSessionIds)


bubbleSpace = "/sillybunny"

@socketio.on("connect", namespace=bubbleSpace)
def connect_handler2():
	print("CONNECTION MADE: {}".format(bubbleSpace))
	playerSessionIds.append(request.sid)
	print(request.sid)



@socketio.on("disconnect", namespace=bubbleSpace)
def disconnect_handler():
	# users_connected.remove("player1")
	print("CLIENT DISCONNECTED")
	print(request.sid)
	

@socketio.on("init_p1_obj_grid", namespace=bubbleSpace)
def handle_received_data(stuff):
	gameData["p1_ObjGrid"] = stuff["data"]


@socketio.on("second_player_ready", namespace=bubbleSpace)
def handle_second_player_ready(stuff):
	gameData["p2_ObjGrid"] = stuff["data"]
	sendPlayersOppData()


def sendPlayersOppData():
	emit("enemy", {"oppName":playerNames[1], "oppGrid":gameData["p2_ObjGrid"]}, room=playerSessionIds[0])
	emit("enemy", {"oppName":playerNames[0], "oppGrid":gameData["p1_ObjGrid"]}, room=playerSessionIds[1])
	setPlayerTurn("player1")


def setPlayerTurn(player):
	# waitingToStart, myTurn, enemyTurn, win, lose
	if player=="player1":
		emit("set_turn", "myTurn", room=playerSessionIds[0])
		emit("set_turn", "enemyTurn", room=playerSessionIds[1])
		gameData["currentPlayerTurn"]=0
	elif player=="player2":
		emit("set_turn", "myTurn", room=playerSessionIds[1])
		emit("set_turn", "enemyTurn", room=playerSessionIds[0])
		gameData["currentPlayerTurn"]=1



@socketio.on("current_player_clicked", namespace=bubbleSpace)
def current_player_clicked(id):
	if gameData["currentPlayerTurn"]==0:
		emit("set_opp_player_screen", {"id":id, "whosTurn":"myTurn"}, room=playerSessionIds[1])
		emit("set_turn", "enemyTurn", room=playerSessionIds[0])
		gameData["currentPlayerTurn"]=1
	elif gameData["currentPlayerTurn"]==1:
		emit("set_opp_player_screen", {"id":id, "whosTurn":"myTurn"}, room=playerSessionIds[0])
		emit("set_turn", "enemyTurn", room=playerSessionIds[1])
		gameData["currentPlayerTurn"]=0

	

@socketio.on("ship_destroyed", namespace=bubbleSpace)
def update_ship_destroyed(ship_destroyed_count):
	playerIdx = playerSessionIds.index(request.sid)
	gameData["shipsDestroyed"][playerIdx]=ship_destroyed_count
	if gameData["shipsDestroyed"][0]==3:
		emit("set_endGame", "win", room=playerSessionIds[0])
		emit("set_endGame", "lose", room=playerSessionIds[1])
	elif gameData["shipsDestroyed"][1]==3:
		emit("set_endGame", "lose", room=playerSessionIds[0])
		emit("set_endGame", "win", room=playerSessionIds[1])












