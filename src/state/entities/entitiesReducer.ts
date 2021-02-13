import { Record, Map, RecordOf } from "immutable"
import { Reducer } from "redux"
import CompanyProfile from '../../models/CompanyProfile';
import LiveTradeData from '../../models/LiveTradeData';
import StockLookup from '../../models/StockLookup';
import { EntitiesActions } from "./entitiesActions";
import { EntitiesTypes } from "./entitiesTypes";

type StockSymbol = string;
type Timestamp = string;
interface IEntitiesState {
  companies: Map<StockSymbol, CompanyProfile>;
  liveTradeData: Map<StockSymbol, Map<Timestamp, LiveTradeData>>;
  stockLookup: Map<StockSymbol, StockLookup>;
}

export type EntitiesState = RecordOf<IEntitiesState>;
const EntitiesStateObject = Record<IEntitiesState>({
  companies: Map(),
  liveTradeData: Map(),
  stockLookup: Map(),
}); 


export const entitiesReducer: Reducer<EntitiesState, EntitiesActions> = (
  state = EntitiesStateObject(),
  action,
) => {
  switch (action.type) {
    case EntitiesTypes.FETCH_COMPANY_PROFILE_SUCCESS:
      return state.setIn(["companies", action.companyProfile.ticker], action.companyProfile);
    default:
      return state;
  }
}