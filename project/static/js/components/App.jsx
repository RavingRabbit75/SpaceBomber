import React from "react"
import SidePanel from "./SidePanel.jsx"
import PlayerPanel from "./PlayerPanel.jsx"
import EnemyPanel from "./EnemyPanel.jsx"

export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			player1: [],
			player2: []
		};

		for(var x=0; x<160; x++){
			this.state.player1.push("empty");
			this.state.player2.push("empty");
		}

		this.initialRandomPlacement(this.state.player1);
		this.initialRandomPlacement(this.state.player2);
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
				<EnemyPanel grid={this.state.player2}/>
				<PlayerPanel grid={this.state.player1}/>
				<SidePanel title="Space Bomber" 
						   p1="Homer Simpson" 
						   p2="Lisa Simpson"
						   shipsDestroyed={1}>by Raymond Chow</SidePanel>
			</div>
		);
	}
}

