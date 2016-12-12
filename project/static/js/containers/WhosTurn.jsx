import React from "react"

export default class WhosTurn extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		var playerTurn;
		if (this.props.whosTurn==="p1"){
			playerTurn="Player 1";
		} else {
			playerTurn="Player 2";
		}
		return(
			<div id="whosTurn">
				Who's turn: {playerTurn}
			</div>
		)
	}

}