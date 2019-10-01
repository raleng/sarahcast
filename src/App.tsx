import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Forecast from "./components/Forecast";
import ApiJson from "./ApiJson";
import { Button } from "react-native";

const API_KEY = process.env.REACT_APP_TIDE_SUNRISE_API_KEY;
const API_URL = "https://raleng.pythonanywhere.com/sunrise-tide-api/v1.0";

class App extends Component {
  state = {
    data: new ApiJson()
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
        <section className="section">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <h1 className="title">Sarahcast</h1>
                <a className="button is-primary" onClick={this.getForecast}>
                  <i className="fa fa-refresh" />
                </a>
              </div>
            </div>
          </nav>
          <div className="container">{this.forecastCards()}</div>
        </section>
      </div>
    );
  }
}

export default App;
