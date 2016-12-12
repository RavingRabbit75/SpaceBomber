import React from "react"
import App from "./App.jsx"
import PlayerLabel from "./../containers/PlayerLabel.jsx"
import EnemyShipsDestroyed from "./../containers/EnemyShipsDestroyed.jsx"
import WhosTurn from "./../containers/WhosTurn.jsx"

export default class SidePanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"game"};
		this.handleClick=this.handleClick.bind(this);
	}

	componentWillUpdate(nextProps, nextState){
		console.log(this.state);
		console.log(nextState);
	}
	
	setupLayout(){
		return(
			<div>
				<div></div>
				<button onClick={this.handleClick}>Change State</button>
			</div>
		)
	}

	gamePlayLayout(){
		var player="p1";
		return(
			<div>
				<div id="playerlabels">
					<PlayerLabel num="1" username={this.props.p1}/>
					<PlayerLabel num="2" username={this.props.p2}/>
					{/* <button onClick={this.handleClick}>Change State</button> */}
				</div>
				<EnemyShipsDestroyed numDestroyed={this.props.shipsDestroyed}/>
				<WhosTurn whosTurn={player}/>
			</div>
			
		)
	}

	// test state switching button
	handleClick() {
		if (this.state.layout==="setup"){
			this.setState({layout:"game"})
		} else {
			this.setState({layout:"setup"})
		}
	}

	handleCheck(){
		this.setState({checked:true})
	}
	
	render(){
		if(this.state.layout=="setup"){
			var layout = this.setupLayout();
		} else {
			var layout = this.gamePlayLayout();
		}

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