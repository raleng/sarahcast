import React, { Component } from "react";
import { STData } from "../STData";

class Forecast extends Component<{ data: STData }> { 
    render () {
        if (this.props.data) {
            return <div><p>{this.props.data.date}|{this.props.data.sunrise}</p>
            <p>Low: {this.props.data.tides_low}</p>
            <p>High: {this.props.data.tides_high}</p></div>
        } else {
            return
        }
    }
}


export default Forecast;