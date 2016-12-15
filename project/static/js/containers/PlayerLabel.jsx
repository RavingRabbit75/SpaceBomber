import React from "react"

export default class PlayerLabel extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<span>{this.props.label}: {this.props.username}</span>
			</div>
		)
	}
}
