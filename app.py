from project import socketio
from project import app
import os

debug = True

if os.environ.get("ENV") == "production":
	debug=False

if __name__ == "__main__":
	socketio.run(app, debug=debug)