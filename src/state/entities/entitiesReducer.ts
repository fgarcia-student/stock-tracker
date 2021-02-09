import { Record, Map } from "immutable"
import { Reducer } from "redux"
import CompanyProfile from '../../models/CompanyProfile';
import LiveTradeData from '../../models/LiveTradeData';
import StockLookup from '../../models/StockLookup';

type StockSymbol = string;
export interface EntitiesState {
  companies: Map<StockSymbol, CompanyProfile>;
  liveTradeData: Map<StockSymbol, LiveTradeData>;
  stockLookup: Map<StockSymbol, StockLookup>;
}

const EntitiesRecord = Record<EntitiesState>({
  companies: Map(),
  liveTradeData: Map(),
  stockLookup: Map(),
}); 

export const entitiesReducer: Reducer<EntitiesState> = (
  state = EntitiesRecord(),
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
}