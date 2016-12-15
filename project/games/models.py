from project import db
# from sqlalchemy.dialects.postgresql import JSON

class Game(db.Model):
	__tablename__ = "games"

	id=db.Column(db.Integer, primary_key=True)
	player1=db.Column(db.Text)
	player2=db.Column(db.Text)
	game_data=db.Column(db.JSON)
		# grid hits and misses for both players (two grids)
		# grid ship & asteroid locations for both players (two grids)
		# enemy ships destroyed for both players
		# number of turns?
		# current player turn

	def __init__(self, player1, player2, game_data):
		self.player1 = player1
		self.player2 = player2
		self.game_data = game_data

	def __repr__(self):
		return "Game is {} vs {}.".format(self.player1, self.player2)

