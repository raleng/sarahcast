import React, { Component } from "react";
import { STData } from "../STData";
import { TouchableHighlightBase } from "react-native";

class Forecast extends Component<{ data: STData }> { 
    render () {
        if (this.props.data) {
            return <div className="box"><h1 className="title">{this.props.data.date}</h1>
            <div className="tags has-addons">
            <span className="tag is-dark">Sunrise</span>
            <span className="tag is-light">{this.props.data.sunrise}</span>
            </div>
            <div className="tags has-addons">
            <span className="tag is-dark">Low</span>
            <span className="tag is-light">{this.props.data.tides_low}</span>
            <span className="tag is-light">{this.props.data.tides_low2}</span>
            </div>
            <div className="tags has-addons">
            <span className="tag is-dark">High</span>
            <span className="tag is-light">{this.props.data.tides_high}</span>
            <span className="tag is-light">{this.props.data.tides_high2}</span>
            </div>
            </div>
        } else {
            return
        }
    }
}


export default Forecast;