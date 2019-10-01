import React, { Component } from "react";
import styled from "styled-components";
import ApiJson, { HighLow, SunriseTides } from "../ApiJson";
import ForecastCard from "./ForecastCard";

export default class Forecast extends Component<{ data: ApiJson }> {
  render() {
    let cards = [];
    if (this.props.data) {
      let dates = Object.entries(this.props.data);

      for (let key in dates) {
        cards.push(<ForecastCard date={dates[key][0]} data={dates[key][1]} />);
        console.log(dates[key][0], dates[key][1]);
      }
    }
    return <div>{cards}</div>;
  }
}
