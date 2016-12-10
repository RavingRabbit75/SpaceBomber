import React from "react"
import SidePanel from "./SidePanel.jsx"
import PlayerPanel from "./PlayerPanel.jsx"
import EnemyPanel from "./EnemyPanel.jsx"

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

