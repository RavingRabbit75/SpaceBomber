import React from "react"
import App from "./App.jsx"
import GridTile from "./../containers/GridTile.jsx"
import Ship from "./../containers/Ship.jsx"
import _ from 'lodash'

export default class EnemyPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={
			layout:"game",
			enemyGridIds: []  // empty, miss or hit
		};
		for (var x=0; x<160; x++){
			this.state.enemyGridIds.push("empty");
		}
		this.getGridId = this.getGridId.bind(this);
	}

	checkIfShipDestroyed(){
		console.log("CB CALLED")
		var shipDestroyedCount=0;
		for (let y=0; y<3; y++){
			let idx = this.props.grid.indexOf("ship"+y);

			// now check on the object grid if all three spots of ship have been hit
			let hitCount=0;
			for(let x=0; x<3; x++){
				let nextShipPoint = x*20;
				console.log('idx', idx)
				console.log('hit or not?', this.state.enemyGridIds[idx+nextShipPoint])
				if(this.state.enemyGridIds[idx+nextShipPoint]==="hit"){
					console.log("HITCOUNT JUST INCREMENTED");
					hitCount++;
				}
			}
			console.log("What is my hitcount", hitCount);
			if(hitCount===2){
				shipDestroyedCount++;
				// this keeps getting reset to 1
				// which is why only 1 red square gets updated
				// need to send values 2,3 to the parent component
				// FIX ME! TOMORROW!
				this.props.shipDestroyedFunc(shipDestroyedCount);
			}
		}

		
		
	}


	setupTiles() {
		return this.state.enemyGridIds.map(function(gridItem,idx){
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
							 whosTurn={this.props.whosTurn}
							 gridId={idx} 
							 key={idx}/>;
		}.bind(this));	
	}


	getGridId(id){
		if (id!==null){
			var updatedGrid = this.state.enemyGridIds.slice();
			if(this.props.grid[id]!=="empty"){
				updatedGrid[id]="hit";
			} else {
				updatedGrid[id]="miss";
			}

			this.setState({
				enemyGridIds: updatedGrid
			}, this.checkIfShipDestroyed());
			// call app function to inform server
			this.props.tileClickedFunc(id)
		}
	}

	// shouldComponentUpdate(props, state, component){
	// 	console.log("PROPS", props)
	// 	console.log("STATE", state)
	// 	if(_.isEqual(this.state.enemyGridIds, state.enemyGridIds)){
	// 		this.checkIfShipDestroyed()
	// 		console.log('UPDATED!')	
	// 		return true
	// 	}
	// 	return false
	// }

	// componentDidUpdate(prevProps, prevState){
		
	// }

	render(){
		return (
			<div id="enemyPanel" className="">
				<div id="objectLayerEnemy">
				</div>
				<div id="gridLayerEnemy">{this.setupTiles()}</div>
			</div>
		)
	}
};