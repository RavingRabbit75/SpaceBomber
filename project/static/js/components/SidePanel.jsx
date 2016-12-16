import React from "react"
import App from "./App.jsx"
import PlayerLabel from "./../containers/PlayerLabel.jsx"
import EnemyShipsDestroyed from "./../containers/EnemyShipsDestroyed.jsx"
import WhosTurn from "./../containers/WhosTurn.jsx"

export default class SidePanel extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillUpdate(nextProps, nextState){
		// console.log(this.state);
		// console.log(nextState);
	}

	gamePlayLayout(){
		return(
			<div>
				<div id="playerlabels">
					<PlayerLabel label="Player" username={this.props.p1}/>
					<PlayerLabel label="Enemy" username={this.props.p2}/>
				</div>
				<EnemyShipsDestroyed numDestroyed={this.props.shipsDestroyed}/>
				<WhosTurn whosTurn={this.props.whosTurn}/>
			</div>
		)
	}

	render(){
		var layout = this.gamePlayLayout();

		return (
			<div id="sidePanel">
				<div id="titleBox">
					<h3 id="title">{this.props.title}</h3>
					<p>{this.props.children}</p>
				</div>
				<div>
					{layout}
				</div>
			</div>
		)
	}
};