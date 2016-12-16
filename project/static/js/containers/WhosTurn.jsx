import React from "react"

export default class WhosTurn extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		var playerTurn;
		if (this.props.whosTurn==="myTurn"){
			playerTurn="Whose turn: YOU";
		} else if (this.props.whosTurn==="enemyTurn") {
			playerTurn="Whose turn: ENEMY";
		} else if (this.props.whosTurn==="win") {
			playerTurn="YOU WIN";
		} else if (this.props.whosTurn==="lose") {
			playerTurn="YOU LOSE";
		}
		return(
			<div id="whosTurn">
				{playerTurn}
			</div>
		)
	}

}