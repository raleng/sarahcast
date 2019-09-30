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
      <section className="section">
        <div className="container">
          <h1 className="title">Sarahcast</h1>
          <div>{this.forecastCards()}</div>
        </div>
      </section>
    );
  }
}

export default App;

/*
 * FROM JULIAN
 *
 * {
 *  "test": {
 *      "a": 2,
 *      "b": {
 *         "c":3
 *      }
 *  }
 * }
 *
 *


interface innerInner {
  c: Number;
}

interface inner {
  a: Number;
  b: [innerInner];
}

interface json {
  [key: string]: inner;
}

const obj: json = {
  a: {
    a: 2,
    b: [{ c: 3 }]
  }
};

Object.entries(obj).map(([_, val]) => {
  val.b[0].c;
});

*/
