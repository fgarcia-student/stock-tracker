import {Record} from "immutable";

export interface StockLookupResponse {
  count: number;
  result: Array<{
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }>;
}

interface StockLookupRecord {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export default class StockLookup extends Record<StockLookupRecord>({
  description: "",
  displaySymbol: "",
  symbol: "",
  type: "",
}) {
  public static fromContract = (res: StockLookupResponse) => res.result.map(c => new StockLookup(c));
}

