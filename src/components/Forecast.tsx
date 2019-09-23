import React, { Component } from "react";
import styled from "styled-components";
import { STData } from "../STData";
import ForecastCard from "./ForecastCard";
import { jsxElement } from "@babel/types";

class Forecast extends Component<{ data: Array<STData> }> { 

  render() {
    if (this.props.data) {
      var cards = this.props.data.map(function(d) {
        return <ForecastCard data={d}/>
      })
    } else {
      return
    }
    
    return <div>{cards}</div>;
  }
}

export default Forecast;
