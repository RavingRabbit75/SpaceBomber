import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App.jsx"

ReactDOM.render(<App p_name={p_name} ready={ready} game_id={game_id}/>, document.getElementById("app"));
