import React from "react"
import App from "./App.jsx"
import GridTile from "./../containers/GridTile.jsx"
import Ship from "./../containers/Ship.jsx"

export default class PlayerPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={
			layout:"game",
			playerGridIds: [] // empty, miss or hit
		};
		// this.playerGridIds={};
		for (var x=0; x<160; x++){
			this.state.playerGridIds.push("empty");
		}
		// this.props.enemyShotGridId
	}

	componentWillReceiveProps(nextProps){
		// nextProps.enemyShotGridId
		var updatedGrid = this.state.playerGridIds.slice();
		if(this.props.grid[nextProps.enemyShotGridId]!=="empty"){
			updatedGrid[nextProps.enemyShotGridId]="hit";
		} else {
			updatedGrid[nextProps.enemyShotGridId]="miss";
		}
		this.setState({
			playerGridIds: updatedGrid
		});
	}

	setupTiles() {
	
		return this.state.playerGridIds.map(function(gridItem,idx){
			var indicator;
			if (gridItem==="hit"){
				indicator="hit";
			} else if (gridItem==="miss") {
				indicator="miss";
			} else {
				indicator="empty";
			}
			return <GridTile returnId={this.getGridId} 
							 indicator={indicator}
							 gridId={idx} 
							 key={idx}/>;
		}.bind(this));	

	}

	getGridId(id){
		console.log(id);
	}

	placeShips(grid){
		var ships=[];

		for(var x=0; x<3; x++){
			var gridNumber;
			
			gridNumber = grid.findIndex(function(gridItem){
				return gridItem==="ship"+x;
			})

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

		}

		return ships;
	}

	

	render(){
		return (
			<div id="playerPanel" className="">
				<div id="objectLayerPlayer">
					{this.placeShips(this.props.grid)}
				</div>
				<div id="gridLayerPlayer">{this.setupTiles()}</div>
			</div>
		)
	}
};