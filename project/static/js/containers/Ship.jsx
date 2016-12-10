import React from "react"

export default class Ship extends React.Component {
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
