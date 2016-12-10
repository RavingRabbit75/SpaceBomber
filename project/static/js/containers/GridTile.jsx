import React from "react"

export default class GridTile extends React.Component {
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







