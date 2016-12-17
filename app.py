from project import socketio
from project import app
import os

if os.environ.get("ENV") == "production":
	debug=False
	app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
	app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('HEROKU_POSTGRESQL_TEAL_URL')

else:
	debug=True
	app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
	app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/space_bomber'

if __name__ == "__main__":
	socketio.run(app)