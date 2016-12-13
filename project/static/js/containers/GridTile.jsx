import React from "react"

export default class GridTile extends React.Component {
	constructor(props){
		super(props);
		this._onClick=this._onClick.bind(this);
	}

	_onClick(event){
		this.props.returnId(this.props.gridId);
	}


	setMarker(){
		var imgUrl1="./../static/images/hitMarker.png";
		var imgUrl2="./../static/images/missMarker.png";
		const hitMarkerStyle = {
		  backgroundImage: 'url(' + imgUrl1 + ')',
		}
		const missMarkerStyle = {
		  backgroundImage: 'url(' + imgUrl2 + ')',
		}

		if(this.props.indicator==="hit"){
			return(<div style={hitMarkerStyle} className="hitMarker"></div>);
		} else if (this.props.indicator==="miss"){
			return(<div style={missMarkerStyle} className="missMarker"></div>);
		} else {
			return(<div></div>);
		}
	}

	render(){
		var imgUrl="./../static/images/singleTile.png";
		const gridTileStyle = {
		  backgroundImage: 'url(' + imgUrl + ')',
		}
		return(
			<div onClick={this._onClick} style={gridTileStyle} className="gridTile">
				{this.setMarker()}
			</div>
		)
	}
};







