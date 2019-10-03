import React, { Component } from "react";
import { SunriseTides, HighLow } from "../ApiJson";

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
    dayMap.set(1, "Mon");
    dayMap.set(2, "Tue");
    dayMap.set(3, "Wed");
    dayMap.set(4, "Thu");
    dayMap.set(5, "Fri");
    dayMap.set(6, "Sat");
    dayMap.set(0, "Sun");

    return (
      <div>
        <h1 className="title is-size-6">{dayMap.get(day)}</h1>
        <h2 className="subtitle is-size-7">{`${utc}.${month + 1}.`}</h2>
      </div>
    );
  };

  sunrise = (sunrise: string) => {
    return (
      <div>
        <i className="fa fa-sun-o" />
        &nbsp;
        <span className="content is-size-6">{sunrise}</span>
      </div>
    );
  };

  allTides = (tides?: HighLow) => {
    let orderedTides = [];
    let orderedTidesTypes = [];

    if (tides) {
      console.log(` whoop: ${tides.low[0]}`);
      for (let i = 0; i < 2; i++) {
        if (!tides.low[i] && tides.high[i]) {
          orderedTidesTypes.push(
            <th>
              <p className="has-text-centered">high</p>
            </th>
          );
          orderedTides.push(
            <td>
              <p className="has-text-centered">{tides.high[i]}</p>
            </td>
          );
        } else if (!tides.high[i] && tides.high[i]) {
          orderedTidesTypes.push(
            <th>
              <p className="has-text-centered">low</p>
            </th>
          );
          orderedTides.push(
            <td>
              <p className="has-text-centered">{tides.low[i]}</p>
            </td>
          );
        } else {
          let firstLowHour = tides.low[i].split(":");
          let firstHighHour = tides.high[i].split(":");
          if (firstLowHour < firstHighHour) {
            orderedTidesTypes.push(
              <th>
                <p className="has-text-centered">low</p>
              </th>
            );
            orderedTides.push(
              <td>
                <p className="has-text-centered">{tides.low[i]}</p>
              </td>
            );
            orderedTidesTypes.push(
              <th>
                <p className="has-text-centered">high</p>
              </th>
            );
            orderedTides.push(
              <td>
                <p className="has-text-centered">{tides.high[i]}</p>
              </td>
            );
          } else {
            orderedTidesTypes.push(
              <th>
                <p className="has-text-centered">high</p>
              </th>
            );
            orderedTides.push(
              <td>
                <p className="has-text-centered">{tides.high[i]}</p>
              </td>
            );
            orderedTidesTypes.push(
              <th>
                <p className="has-text-centered">low</p>
              </th>
            );
            orderedTides.push(
              <td>
                <p className="has-text-centered">{tides.low[i]}</p>
              </td>
            );
          }
        }
      }
      return (
        <div className="columns is-centered">
          <div className="column is-narrow">
            <table className="table is-fullwidth">
              <tbody>
                <tr>{orderedTidesTypes}</tr>
                <tr>{orderedTides}</tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  getSunriseTide = (sunrise: string, tides?: HighLow) => {
    if (tides) {
      let firstLowTide = tides.low[0];
      let firstHighTide = tides.high[0];
      let lowHour = Number(firstLowTide.split(":")[0]);
      let highHour = Number(firstHighTide.split(":")[0]);

      if (Math.abs(lowHour - 6) >= Math.abs(highHour - 6)) {
        return (
          <div>
            <i className="fa fa-arrow-up" />
            &nbsp;
            <span className="content is-size-6">{firstHighTide}</span>
          </div>
        );
      } else {
        return (
          <div>
            <i className="fa fa-arrow-down" />
            &nbsp;
            <span className="content is-size-6">{firstLowTide}</span>
          </div>
        );
      }
    }
  };

  render() {
    if (this.props.data) {
      return (
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="columns is-mobile is-vcentered">
                <div className="column has-text-left">
                  {this.sunrise(this.props.data.sunrise)}
                </div>
                <div className="column has-text-centered">
                  {this.formatDate(this.props.date)}
                </div>
                <div className="column has-text-right">
                  {this.getSunriseTide(
                    this.props.data.sunrise,
                    this.props.data.tides
                  )}
                </div>
              </div>
            </div>
            <div className="card-content">
              <div>{this.allTides(this.props.data.tides)}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  }
}
