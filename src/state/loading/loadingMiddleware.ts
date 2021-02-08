import { Dispatch, Middleware } from "redux";
import { RootState } from "../rootReducer";

export const loadingMiddleware: Middleware<Dispatch, RootState> = (api) => (next) => (action) => {
  // implement loading mask middleware
  return next(action);
}
