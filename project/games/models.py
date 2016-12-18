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

	def __init__(self, player1):
		self.player1 = player1

	def __repr__(self):
		return "Game is {} vs {}.".format(self.player1, self.player2)

	def init_player2(self, game_id, player2):
		self.game_id=game_id
		self.player2=player2

	def init_game_data(self, game_data):
		self.game_data=game_data

	def get_random_gameId():
		return "".join([random.choice(Game.letters_tuple[0:]+Game.numbers_tuple[0:]) for i in range(25)])