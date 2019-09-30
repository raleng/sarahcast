export class SunriseTidesData {
  date: string = "";
  sunrise: string = "";
  tides_low?: Array<string>;
  tides_low2?: Array<string>;
  tides_high?: Array<string>;
  tides_high2?: Array<string>;
  
  constructor(json: any) {
    this.sunrise = json.sunrise;
    this.tides_low = [];
    this.tides_low2 = [];
    if (json.tides.low[0]) { this.tides_low.push(json.tides.low[0])}
    if (json.tides.low[1]) { this.tides_low2.push(json.tides.low[1])} 
    
    this.tides_high = [];
    this.tides_high2 = [];
    if (json.tides.high[0]) { this.tides_high.push(json.tides.high[0])}
    if (json.tides.high[1]) { this.tides_high2.push(json.tides.high[1])}
    
  }
}
