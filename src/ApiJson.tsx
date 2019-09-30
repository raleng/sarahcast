export interface HighLow {
  low: string[];
  high: string[];
}
export interface SunriseTides {
  sunrise: string;
  tides?: HighLow;
}
export default class ApiJson {
  [key: string]: SunriseTides;
}
