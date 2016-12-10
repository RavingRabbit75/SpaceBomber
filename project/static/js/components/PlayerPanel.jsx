import React from "react"
import App from "./App.jsx"
import GridTile from "./../containers/GridTile.jsx"
import Ship from "./../containers/Ship.jsx"

export default class PlayerPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"game"};
		this.handleClick = this.handleClick.bind(this);
		this.playerGridIds={};
	}
	setupTiles() {
		var grids=[];
		for(var x=0; x<160; x++){
			grids.push(<GridTile returnId={this.getGridId} gridId={x} key={x}/>);
		}
		return grids;
	}

	handleClick(evt){
		
	}

	getGridId(id){
		console.log(id);
	}

	getRandomNumber(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	initialRandomPlacement(){
		var ships=[];
		
		for(var x=0; x<3; x++){
			var notDone=true;
			do {
				var gridNumber = this.getRandomNumber(0,119);
				if (this.playerGridIds[gridNumber]===undefined &&
					this.playerGridIds[gridNumber+20]===undefined &&
					this.playerGridIds[gridNumber+40]===undefined )
				{

					var yLoc = Math.floor(gridNumber/20)*50;

					var digit = String(Math.floor(gridNumber/2));
					var endDigit;
					if (digit.length===3){
						endDigit = digit.charAt(2);
					} else if (digit.length===2) {
						endDigit = digit.charAt(1);
					} else if(digit.length===1){
						endDigit = digit.charAt(0);
					}

					var xLoc;
					var digit2 = String(gridNumber);
					if (endDigit<5){
						if (digit2.length===3){
							xLoc = parseInt(digit2.charAt(2))*50;
						} else if(digit2.length===2){
							xLoc = parseInt(digit2.charAt(1))*50;
						} else {
							xLoc = parseInt(digit2.charAt(0))*50;
						}
					} else {
						if (digit2.length===3){
							xLoc = parseInt(digit2.charAt(2))*50+500;
						} else if(digit.length===2){
							xLoc = parseInt(digit2.charAt(1))*50+500;
						} else {
							xLoc = parseInt(digit2.charAt(0))*50+500;
						}
					}

					ships.push(<Ship shipId={x} key={x} xLoc={xLoc} yLoc={yLoc}/>)
					this.playerGridIds[gridNumber]="ship"+x;
					this.playerGridIds[gridNumber+20]="ship"+x;
					this.playerGridIds[gridNumber+40]="ship"+x;
					
					notDone=false;
				}

			} while(notDone===true);
		}
		return ships;
	}

	render(){
		return (
			<div id="playerPanel" className="">

				<div id="objectLayerPlayer">
					{this.initialRandomPlacement()}
				</div>
				<div id="gridLayerPlayer">{this.setupTiles()}</div>
			</div>
		)
	}
};