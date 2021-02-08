import { applyMiddleware, createStore } from "redux";
import { loadingMiddleware } from "./loading/loadingMiddleware";
import { rootReducer } from "./rootReducer";

const middlewareEnhancer = applyMiddleware(loadingMiddleware);

export const store = createStore(rootReducer, middlewareEnhancer);
