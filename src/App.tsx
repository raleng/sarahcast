import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import ForecastCard from "./components/ForecastCard";

const API_KEY = process.env.REACT_APP_TIDE_SUNRISE_API_KEY
const API_USER = process.env.REACT_APP_TIDE_SUNRISE_API_USER
const API_URL = "https://raleng.pythonanywhere.com/sunrise-tide-api/v1.0"


class App extends Component {
  state = {
    dates: Array<Data>()
  };

  componentDidMount() {   
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(API_USER + ':' + API_KEY));

    fetch(API_URL, { method: 'GET', headers: headers })
      .then(response => response.json())
      .then(data => {
        this.setState( { dates: data })
        
        for (let [key, value] of Object.entries(data)) {
          console.log(`k: ${key}, v: ${value}`)
          let d = new STData;
          d.date = key;
          d.sunrise = Object.entries(data[key])[0][1] as string;
          let foo = Object.entries(data[key])[1][1]
          

        }
  
      
      })
      .catch(console.log);
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Sarahcast!</h1>
          <p className="subtitle">
            This is going to be the new home of the <strong>Sarahcast!</strong>
          </p>
          <div><ForecastCard/></div>
        </div>
      </section>
    );
  }
}

interface Data {
  date: {
    sunrise: string;
    tides: {
      high: string[],
      low: string[]
    }
  }
}

class STData {
  date: string = "";
  sunrise: string = "";
  tides_low: string[] = [];
  tides_high: string[] = [];
}

export default App;