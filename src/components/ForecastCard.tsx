import React, { Component } from "react";
import { SunriseTides, HighLow } from "../ApiJson";
import { TouchableHighlight } from "react-native";

export default class ForecastCard extends Component<{
  date: string;
  data: SunriseTides;
}> {
  formatDate = (dateString: string) => {
    let date = new Date(dateString);
    let utc = date.getUTCDate();

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    let dayMap = new Map<number, string>();
    dayMap.set(1, "Monday");
    dayMap.set(2, "Tuesday");
    dayMap.set(3, "Wednesday");
    dayMap.set(4, "Thursday");
    dayMap.set(5, "Friday");
    dayMap.set(6, "Saturday");
    dayMap.set(0, "Sunday");

    return `${dayMap.get(day)}, ${utc}.${month}.${year}`;
  };

  sunrise = (sunrise: string) => {
    return (
      <div className="tags has-addons">
        <span className="tag is-dark">Sunrise</span>
        <span className="tag is-light">{sunrise}</span>
      </div>
    );
  };

  lowTides = (tides?: HighLow) => {
    let low = [];
    let high = [];

    if (tides) {
      for (let tide in tides.low) {
        console.log(tides.low[tide]);
        low.push(<span className="tag is-light">{tides.low[tide]}</span>);
      }
    }

    if (tides) {
      for (let tide in tides.high) {
        high.push(<span className="tag is-light">{tides.high[tide]}</span>);
      }
    }

    return (
      <div>
        <div className="tags has-addons">
          <span className="tag is-dark">Low</span>
          {low}
        </div>
        <div className="tags has-addons">
          <span className="tag is-dark">High</span>
          {high}
        </div>
      </div>
    );
  };

  render() {
    if (this.props.data) {
      return (
        <div className="box">
          <h2 className="title">{this.formatDate(this.props.date)}</h2>
          {this.sunrise(this.props.data.sunrise)}
          {this.lowTides(this.props.data.tides)}
        </div>
      );
    } else {
      return;
    }
  }
}
