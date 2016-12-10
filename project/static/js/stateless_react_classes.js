import React from "react"
import EnemyPanel from "./stateful_react_classes.js"


export class GridTile extends React.Component {
	constructor(props){
		super(props);
		this.state={display:"empty"};
		this._onClick=this._onClick.bind(this);
	}

	_onClick(event){
		this.props.returnId(this.props.gridId);
	}

	setMarker(){
		if(this.state.display==="hit"){
			return(<div className="hitMarker"></div>);
		} else if (this.state.display==="miss"){
			return(<div className="missMarker"></div>);
		} else {
			return(<div></div>);
		}
	}

	render(){
		return(
			<div onClick={this._onClick} className="gridTile">
				{this.setMarker()}
			</div>
		)
	}
};

export class Ship extends React.Component {
	constructor(props){
		super(props);
		this.state={mode:"setup"};
	}

	shipSetupMode(){
		var imgUrl="./../static/images/ship1.png";
		const shipStyle = {
		  backgroundImage: 'url(' + imgUrl + ')',
		  left: this.props.xLoc,
		  top: this.props.yLoc
		}

		return(<div style={shipStyle} className="ship1"></div>)
	}

	render(){
		if(this.state.mode==="setup"){
			var ship = this.shipSetupMode();
		} else {
			var ship = this.shipPlayMode();
		}

		return(
			<div>
				{ship}
			</div>
		)
	}
}

export class PlayerLabel extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<span>Player {this.props.num}: {this.props.username}</span>
			</div>
		)
	}
}





