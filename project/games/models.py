from project import db
import random

class Game(db.Model):
	__tablename__ = "games"

	id=db.Column(db.Integer, primary_key=True)
	game_id=db.Column(db.Text, unique=True)
	player1=db.Column(db.Text)
	player2=db.Column(db.Text)
	game_data=db.Column(db.JSON)
		# grid hits and misses for both players (two grids)
		# grid ship & asteroid locations for both players (two grids)
		# enemy ships destroyed for both players
		# number of turns?
		# current player turn

	letters_tuple = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	numbers_tuple = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')
	p1_sid=""
	p2_sid=""

	def __init__(self, player1, game_id):
		self.player1 = player1
		self.game_id=game_id
		self.player2 = None
		self.game_data = {}

	def init_player2(self, player2):
		self.player2=player2

	def init_game_data(self, game_data):
		self.game_data=game_data

	def get_random_gameId():
		return "".join([random.choice(Game.letters_tuple[0:]+Game.numbers_tuple[0:]) for i in range(25)])

	def set_p1_ObjGrid(self, p1_ObjGrid):
		self.game_data["p1_ObjGrid"] = p1_ObjGrid

	def set_p2_ObjGrid(self, p2_ObjGrid):
		self.game_data["p2_ObjGrid"] = p2_ObjGrid

	def set_p1_HitGrid(self, p1_HitGrid):
		self.game_data["p1_ObjGrid"] = p1_HitGrid

	def set_p2_HitGrid(self, p2_HitGrid):
		self.game_data["p1_ObjGrid"] = p2_HitGrid

	def set_p1_shipsDestroyed(self, shipsDestroyed):
		self.game_data["p1_shipsDestroyed"] = shipsDestroyed

	def set_p2_shipsDestroyed(self, shipsDestroyed):
		self.game_data["p2_shipsDestroyed"] = shipsDestroyed

	def get_p1_shipsDestroyed(self):
		return self.game_data["p1_shipsDestroyed"]

	def get_p2_shipsDestroyed(self):
		return self.game_data["p2_shipsDestroyed"]

	def set_turnNumber(self, turnNumber):
		self.game_data["turnNumber"] = turnNumber

	def set_currentPlayerTurn(self, currentPlayerTurn):
		self.game_data["currentPlayerTurn"] = currentPlayerTurn

	def get_currentPlayerTurn(self):
		return self.game_data["currentPlayerTurn"]


