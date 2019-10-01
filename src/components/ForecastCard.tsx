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

    return `${dayMap.get(day)}, ${utc}.${month}.`;
  };

  sunrise = (sunrise: string) => {
    return (
      <div>
        <i className="fa fa-sun-o" />
        <span className="content">{sunrise}</span>
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

  getSunriseTide = (sunrise: string, tides?: HighLow) => {
    let res = sunrise.split(":");
    let sunriseHour = Number(res[0]);

    if (tides) {
      let firstLowTide = tides.low[0];
      let firstHighTide = tides.high[0];
      let lowHour = Number(firstLowTide.split(":")[0]);
      let highHour = Number(firstHighTide.split(":")[0]);

      if (Math.abs(lowHour - 6) >= Math.abs(highHour - 6)) {
        return (
          <div>
            <i className="fa fa-arrow-up" />
            <span className="content">{firstHighTide}</span>
          </div>
        );
      } else {
        return (
          <div>
            <i className="fa fa-arrow-down" />
            <span className="content">{firstLowTide}</span>
          </div>
        );
      }
    }
  };

  render() {
    if (this.props.data) {
      return (
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {this.sunrise(this.props.data.sunrise)}
            </p>
            <h1 className="card-header-title">
              {this.formatDate(this.props.date)}
            </h1>
            <p className="card-header-title">
              {this.getSunriseTide(
                this.props.data.sunrise,
                this.props.data.tides
              )}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {this.lowTides(this.props.data.tides)}
            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  }
}
