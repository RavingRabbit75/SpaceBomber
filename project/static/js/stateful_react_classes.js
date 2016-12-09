import React from "react"
import {GridTile, Ship, PlayerLabel} from "./stateless_react_classes.js"


class EnemyPanel extends React.Component {
	setupTiles() {
		var grids=[];
		for(var x=0; x<160; x++){
			grids.push(<GridTile key={x}/>);
		}
		return grids;
	}
	render(){
		return (
			<div id="enemyPanel" className="">
				<div id="gridLayerEnemy">{this.setupTiles()}</div>
				<div id="objectLayerEnemy"></div>
			</div>
		)
	}
};


class PlayerPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"setup"};
		this.handleClick = this.handleClick.bind(this);
		this.playerGridIds={};
	}
	setupTiles() {
		var grids=[];
		for(var x=0; x<160; x++){
			grids.push(<GridTile gridId={x} key={x}/>);
		}
		return grids;
	}

	handleClick(evt){
		
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
				console.log(this.playerGridIds);

			} while(notDone===true);
		}
		return ships;
	}

	render(){
		return (
			<div id="playerPanel" className="">

				<div id="objectLayerPlayer">
				{this.initialRandomPlacement()}
				{/*
					<Ship shipId="1" xLoc="0" yLoc="50"/>
					<Ship shipId="2" xLoc="500" yLoc="100"/>
					<Ship shipId="3" xLoc="200" yLoc="200"/>
				*/}
				</div>
				<div id="gridLayerPlayer">{this.setupTiles()}</div>
			</div>
		)
	}
};

class SidePanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"setup"};
		this.handleClick=this.handleClick.bind(this);
	}

	componentWillUpdate(nextProps, nextState){
		console.log(this.state);
		console.log(nextState);
	}
	

	setupLayout(){
		return(
			<div>
				{/* empty comments */}
				<div></div>
				<button onClick={this.handleClick}>Change State</button>
			</div>
		)
	}

	gamePlayLayout(){
		return(
			<div>
				<PlayerLabel num="1" username="Homer"/>
				<PlayerLabel num="2" username=""/>
				<button onClick={this.handleClick}>Change State</button>
			</div>
		)
	}

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

export default class App extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return(
			<div>
				<EnemyPanel/>
				<PlayerPanel/>
				<SidePanel title="Space Bomber">by Raymond Chow</SidePanel>
			</div>
		);
	}
}

