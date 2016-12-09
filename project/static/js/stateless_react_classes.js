import React from "react"


export class GridTile extends React.Component {
	constructor(props){
		super(props);
		this._onClick=this._onClick.bind(this);
	}

	_onClick(event){
		// console.log(this.props.gridId);
		// console.log((Math.floor(this.props.gridId/20))*50);
		// var digit = String(Math.floor(this.props.gridId/2))
		// var endDigit;
		// if (digit.length>1){
		// 	endDigit = digit.charAt(1)
		// } else {
		// 	endDigit = digit.charAt(0)
		// }

		// var multiplyer;
		// var xLoc;
		// var digit2 = String(this.props.gridId);
		// if (endDigit<5){
		// 	if(digit2.length>1){
		// 		xLoc = parseInt(digit2.charAt(1))*50;
		// 	} else {
		// 		xLoc = parseInt(digit2.charAt(0))*50;
		// 	}
		// } else {
		// 	if(digit2.length>1){
		// 		xLoc = parseInt(digit2.charAt(1))*50+500;
		// 	} else {
		// 		xLoc = parseInt(digit2.charAt(0))*50+500;
		// 	}
		// }
		// console.log(xLoc);
	}

	render(){
		return(
			<div onClick={this._onClick} className="gridTile"></div>
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
		if(this.state.mode=="setup"){
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





