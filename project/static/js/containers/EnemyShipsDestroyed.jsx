import React from "react"

export default class EnemyShipsDestroyed extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		var markers=[];
		for(var x=0; x<3; x++){
			if(x<this.props.numDestroyed){
				markers.push(<div className="ships-destroyed-marker-on" key={x}/>)
			} else {
				markers.push(<div className="ships-destroyed-marker-off" key={x}/>)
			}
		}
		return(
			<div id="shipsDestroyedStatus">
				<div id="shipsDestroyedTitle">Enemy Ships Destroyed:</div>
				{markers}
			</div>
		)
	}	
}