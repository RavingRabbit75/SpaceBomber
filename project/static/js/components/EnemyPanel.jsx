import React from "react"
import App from "./App.jsx"
import GridTile from "./../containers/GridTile.jsx"
import Ship from "./../containers/Ship.jsx"


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
		// this.clicked=false;
		if (!this.clicked){
			if (id!==null){
				var updatedGrid = this.state.enemyGridIds.slice();
				if(this.props.grid[id]!=="empty"){
					updatedGrid[id]="hit";
				} else {
					updatedGrid[id]="miss";
				}
				this.setState({
					enemyGridIds: updatedGrid
				});
				// call app function to inform server
				this.props.tileClickedFunc(id)

			}
		}
		
		// this.clicked=true;
	}

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