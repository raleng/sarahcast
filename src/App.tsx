import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Forecast from "./components/Forecast";
import { STData } from "./STData";

const API_KEY = process.env.REACT_APP_TIDE_SUNRISE_API_KEY
const API_URL = "https://raleng.pythonanywhere.com/sunrise-tide-api/v1.0"

class App extends Component {
  state = {
    dates: Array<STData>()
  };

  componentDidMount() {   
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('sarahcast' + ':' + API_KEY));

    fetch(API_URL, { method: 'GET', headers: headers })
      .then(response => response.json())
      .then(data => {
        let dataArray: Array<STData> = []
        let counter = 0
        for (let [key, value] of Object.entries(data)) {
          counter++
          if (counter < 8) {
      
          let d = new STData(value);
          d.date = key;
          dataArray.push(d)
          }
        }
        this.setState( { dates: dataArray })
    
      })
      .catch(console.log);
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Sarahcast</h1>
          <div><Forecast data={this.state.dates}/></div>
        </div>
      </section>
    );
  }
}


export default App;