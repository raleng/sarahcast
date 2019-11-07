import React, { Component } from "react";
import { SunriseTides, HighLow } from "../ApiJson";
import ForecastModal from "./ForecastModal";

export default class ForecastCard extends Component<{
  date: string;
  data: SunriseTides;
}> {
  state = {
    modalState: false
  };

  formatDate = (dateString: string) => {
    let forecastDate = new Date(dateString);
    //let utc = date.getUTCDate();
    let date_string = forecastDate.toLocaleString("en-US", { timeZone: "America/El_Salvador" });
    let date = new Date(date_string);

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

    return (
      <div>
        <h1 className="title is-size-6">{dayMap.get(day)}</h1>
        <h2 className="subtitle is-size-7">{`${date}.${month + 1}.`}</h2>
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
            <th><p className="has-text-centered">high</p></th>
          );
          orderedTides.push(
            <td><p className="has-text-centered">{tides.high[i]}</p></td>
          );
        } else if (!tides.high[i] && tides.high[i]) {
          orderedTidesTypes.push(
            <th><p className="has-text-centered">low</p></th>
          );
          orderedTides.push(
            <td><p className="has-text-centered">{tides.low[i]}</p></td>
          );
        } else if (tides.high[i] && tides.low[i]) {
          let firstLowHour = tides.low[i].split(":");
          let firstHighHour = tides.high[i].split(":");
          if (firstLowHour < firstHighHour) {
            orderedTidesTypes.push(
              <th><p className="has-text-centered">low</p></th>
            );
            orderedTides.push(
              <td><p className="has-text-centered">{tides.low[i]}</p></td>
            );
            orderedTidesTypes.push(
              <th><p className="has-text-centered">high</p></th>
            );
            orderedTides.push(
              <td><p className="has-text-centered">{tides.high[i]}</p></td>
            );
          } else {
            orderedTidesTypes.push(
              <th><p className="has-text-centered">high</p></th>
            );
            orderedTides.push(
              <td><p className="has-text-centered">{tides.high[i]}</p></td>
            );
            orderedTidesTypes.push(
              <th><p className="has-text-centered">low</p></th>
            );
            orderedTides.push(
              <td><p className="has-text-centered">{tides.low[i]}</p></td>
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

  getSunriseTide = (tides?: HighLow) => {
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

  showModal = () => {
    this.setState({
      modalState: !this.state.modalState
    });
  };

  render() {
    if (this.props.data) {
      return (
        <div className="container">
          <div className="card" onClick={() => {
            this.showModal();
          }}>
            <div className="card-content">
              <div className="columns is-mobile is-vcentered">
                <div className="column has-text-left is-narrow">
                  {this.sunrise(this.props.data.sunrise)}
                </div>
                <div className="column has-text-centered">
                  {this.formatDate(this.props.date)}
                </div>
                <div className="column has-text-right is-narrow">
                  {this.getSunriseTide(
                    this.props.data.tides
                  )}
                </div>
              </div>
            </div>
            <ForecastModal show={this.state.modalState}>
              <div>{this.allTides(this.props.data.tides)}</div>
            </ForecastModal>
            <div className="card-content">

            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  }
}
