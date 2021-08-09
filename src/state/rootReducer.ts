import {combineReducers} from "redux";
import {entitiesReducer, EntitiesState} from './entities/entitiesReducer';
import {loadingReducer, LoadingState} from "./loading/loadingReducer";
import {SessionState, sessionReducer} from './session/sessionReducer';

export interface RootState {
  entities: EntitiesState;
  loading: LoadingState;
  session: SessionState;
}

export const rootReducer = combineReducers<RootState>({
  entities: entitiesReducer,
  loading: loadingReducer,
  session: sessionReducer,
})