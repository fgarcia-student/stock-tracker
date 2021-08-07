import {Record} from "immutable";

export interface LiveTradeDataResponse {
  /*
    Type of message 
  */
  type: string;
  /*
    List of trades 
  */
  data: Array<{
    /*
      Symbol
    */
    s?: string;
    /*
      Last price
    */
    p?: number;
    /*
      UNIX millisecond timestamp
    */
    t?: number;
    /*
      Volume
    */
    v?: number;
    /*
      Trade conditions
    */
    c?: string;
  }>
}

interface LiveTradeDataRecord {
  symbol: string;
  price: number;
  timestamp: number;
  volume: number;
  tradeCondition: string;
}

export default class LiveTradeData extends Record<LiveTradeDataRecord>({
  symbol: "",
  price: 0,
  timestamp: 0,
  volume: 0,
  tradeCondition: "",
}) {
  public static fromContract = (res: LiveTradeDataResponse) =>
    res.data.map(r => new LiveTradeData({
      symbol: r.c,
      price: r.p,
      timestamp: r.t,
      volume: r.v,
      tradeCondition: r.c,
    }));
}