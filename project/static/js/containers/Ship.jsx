import React from "react"

export default class Ship extends React.Component {
	constructor(props){
		super(props);
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
		var ship = this.shipSetupMode();
		return(
			<div>
				{ship}
			</div>
		)
	}
}
