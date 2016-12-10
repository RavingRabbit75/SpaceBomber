import React from "react"
import {GridTile, Ship, PlayerLabel} from "./stateless_react_classes.js"


class EnemyPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"game"};
		this.enemyGridIds={};
		this._handleClick = this._handleClick.bind(this);
		this.tempVar=10000;
	}
	setupTiles() {
		var grids=[];
		for(var x=0; x<160; x++){
			grids.push(<GridTile returnId={this.getGridId} gridId={x} key={x}/>);
		}
		return grids;
	}

	_handleClick(evt){

	}

	getGridId(id){
		this.tempVar=id;
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
				if (this.enemyGridIds[gridNumber]===undefined &&
					this.enemyGridIds[gridNumber+20]===undefined &&
					this.enemyGridIds[gridNumber+40]===undefined )
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
					this.enemyGridIds[gridNumber]="ship"+x;
					this.enemyGridIds[gridNumber+20]="ship"+x;
					this.enemyGridIds[gridNumber+40]="ship"+x;
					
					notDone=false;
				}

			} while(notDone===true);
		}
		return ships;
	}

	render(){
		
		return (
			<div id="enemyPanel" className="">
				<div id="objectLayerEnemy">
					{this.initialRandomPlacement()}
				</div>
				<div id="gridLayerEnemy" onClick={this._handleClick}>{this.setupTiles()}</div>
			</div>
		)
	}
};

class PlayerPanel extends React.Component {
	constructor(props){
		super(props);
		this.state={layout:"game"};
		this.handleClick = this.handleClick.bind(this);
		this.playerGridIds={};
	}
	setupTiles() {
		var grids=[];
		for(var x=0; x<160; x++){
			grids.push(<GridTile returnId={this.getGridId} gridId={x} key={x}/>);
		}
		return grids;
	}

	handleClick(evt){
		
	}

	getGridId(id){
		console.log(id);
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

			} while(notDone===true);
		}
		return ships;
	}

	render(){
		return (
			<div id="playerPanel" className="">

				<div id="objectLayerPlayer">
					{this.initialRandomPlacement()}
				</div>
				<div id="gridLayerPlayer">{this.setupTiles()}</div>
			</div>
		)
	}
};

class SidePanel extends React.Component {
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
		return(
			<div id="playerlabels">
				<PlayerLabel num="1" username={this.props.p1}/>
				<PlayerLabel num="2" username={this.props.p2}/>
				{/* <button onClick={this.handleClick}>Change State</button> */}
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

export default class App extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return(
			<div>
				<EnemyPanel/>
				<PlayerPanel/>
				<SidePanel title="Space Bomber" p1="Homer Simpson" p2="Lisa Simpson">by Raymond Chow</SidePanel>
			</div>
		);
	}
}

