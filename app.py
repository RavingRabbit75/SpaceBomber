from project import socketio
from project import app

if __name__ == "__main__":
	socketio.run(app, port=8000)