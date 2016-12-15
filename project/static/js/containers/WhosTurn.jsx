import React from "react"

export default class WhosTurn extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		var playerTurn;
		if (this.props.whosTurn==="myTurn"){
			playerTurn="YOU";
		} else {
			playerTurn="ENEMY";
		}
		return(
			<div id="whosTurn">
				Who's turn: {playerTurn}
			</div>
		)
	}

}