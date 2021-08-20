import {applyMiddleware, compose, createStore} from "redux";
import {loadingMiddleware} from "./loading/loadingMiddleware";
import {rootReducer} from "./rootReducer";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from './rootEpic';
import {SetTokenCreator} from './session/sessionActions';

const epicMiddleware = createEpicMiddleware();
const middleware = [
  loadingMiddleware,
  epicMiddleware
]
const middlewareEnhancer = applyMiddleware(...middleware);
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;
export const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));
epicMiddleware.run(rootEpic as any);

if (process.env.NODE_ENV === "development") {
  // during development get the token from local .env
  store.dispatch(SetTokenCreator(process.env.REACT_APP_API_KEY));
}
