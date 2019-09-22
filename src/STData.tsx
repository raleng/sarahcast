export class STData {
  date: string = "";
  sunrise: string = "";
  tides_low?: string[] = [];
  tides_high?: string[] = [];
  
  constructor(json: any) {
    this.sunrise = json.sunrise;
    this.tides_low = json.tides.low;
    this.tides_high = json.tides.high;
  }
}
