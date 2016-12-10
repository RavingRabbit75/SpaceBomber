import React from "react"

export default class PlayerLabel extends React.Component {
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
