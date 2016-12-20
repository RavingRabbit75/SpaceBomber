import React from "react"
import SidePanel from "./SidePanel.jsx"
import PlayerPanel from "./PlayerPanel.jsx"
import EnemyPanel from "./EnemyPanel.jsx"


export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			player: [], // player 1 object grid
			enemy: [], // player 2 object grid
			player1Name: this.props.p_name,
			player2Name: "",
			enemyShot: null,
			shipsDestroyed: 0,
			player_status: "waitingToStart" // waitingToStart, myTurn, enemyTurn, win, lose
		};

		this.readyFlagged=false;
		// set up initial grid tiles
		for(var x=0; x<160; x++){
			this.state.player.push("empty");
		}
		
		this.initialRandomPlacement(this.state.player);

		this.socket = io.connect('http://' + document.domain + ':' + location.port);
		this.socket.on('connect', function() {
			Cookies.set('game_id', this.props.game_id, { expires: 7 });
			Cookies.set('username', this.props.p_name, { expires: 7 });
		}.bind(this));


		if(this.readyFlagged===false){
			if (this.props.ready==="no"){
				this.socket.emit('init_p1_obj_grid', {game_id: this.props.game_id, data: this.state.player});
				this.readyFlagged=true;
			} else if (this.props.ready==="yes") {
				this.socket.emit('second_player_ready',{game_id: this.props.game_id, data: this.state.player});
				this.readyFlagged=true;
			}
		}
		
		this.socket.on("enemy", function(delivery){
			this.setState({
				player2Name: delivery.oppName,
				enemy: delivery.oppGrid
			});
		}.bind(this));

		this.socket.on("set_turn", function(statusDelivery){
			this.setState({
				player_status: statusDelivery
			})
		}.bind(this));

		this.socket.on("set_opp_player_screen", function(delivery){
			this.setState({
				enemyShot: delivery.id	
			})
			this.setState({
				player_status: delivery.whosTurn
			})
		}.bind(this));


		this.socket.on("set_endGame", function(endGame_status){
			this.setState({
				player_status: endGame_status
			})
		}.bind(this));

	}

	tellServerTileClicked(id){
		this.socket.emit("current_player_clicked", {id:id, game_id: this.props.game_id})
	}

	tellServerShipDestroyed(shipsDestroyedCount, enemyGridIds){
		this.socket.emit("ship_destroyed", {shipsDC: shipsDestroyedCount, enemyGID: enemyGridIds, game_id: this.props.game_id});
		this.setState({
			shipsDestroyed:shipsDestroyedCount
		});
	}

	getRandomNumber(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	initialRandomPlacement(gridArray){
		for(var x=0; x<3; x++){
			var notDone=true;
			do {
				var gridNumber = this.getRandomNumber(0,119);
				if (gridArray[gridNumber]==="empty" &&
					gridArray[gridNumber+20]==="empty" &&
					gridArray[gridNumber+40]==="empty" )
				{
					gridArray[gridNumber]="ship"+x;
					gridArray[gridNumber+20]="ship"+x;
					gridArray[gridNumber+40]="ship"+x;
					
					notDone=false;
				}

			} while(notDone===true);
		}
	}

	render() {
		return(
			<div>
				<EnemyPanel grid={this.state.enemy} 
							whosTurn={this.state.player_status}
							tileClickedFunc={this.tellServerTileClicked.bind(this)}
							shipDestroyedFunc={this.tellServerShipDestroyed.bind(this)} />
				<PlayerPanel grid={this.state.player} enemyShotGridId={this.state.enemyShot}/>
				<SidePanel title="Space Bomber" 
						   p1={this.state.player1Name}
						   p2={this.state.player2Name}
						   shipsDestroyed={this.state.shipsDestroyed}
						   whosTurn={this.state.player_status}>by Raymond Chow</SidePanel>
			</div>
		);
	}
}

