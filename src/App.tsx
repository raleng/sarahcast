import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Forecast from "./components/Forecast";
import ApiJson from "./ApiJson";

const API_KEY = process.env.REACT_APP_TIDE_SUNRISE_API_KEY;
const API_URL = "https://raleng.pythonanywhere.com/sunrise-tide-api/v1.0";

class App extends Component {
  state = {
    data: new ApiJson()
  };

  daysToGo = () => {
    let today = new Date();
    let currentDay = today.getUTCDate();
    let daysToGo = 21 - currentDay;

    return daysToGo;
  };

  getForecast = () => {
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + btoa("sarahcast" + ":" + API_KEY)
    );

    fetch(API_URL, { method: "GET", headers: headers })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      });
    console.log("Forecast fetched.");
  };

  forecastCards() {
    let { data } = this.state;
    if (data) {
      return <Forecast data={data} />;
    } else {
      return "";
    }
  }

  componentDidMount() {
    this.getForecast();
  }

  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-mobile">
                <div className="column is-four-fifths has-text-left">
                  <h1 className="title">Sarahcast</h1>
                  <h6 className="subtitle is-size-7">
                    Only {this.daysToGo()} days to go!
                  </h6>
                </div>
                <div className="column has-text-right">
                  <a className="button is-primary" onClick={this.getForecast}>
                    <i className="fa fa-refresh" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">{this.forecastCards()}</div>
      </div>
    );
  }
}

export default App;
