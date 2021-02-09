import { Action, Dispatch, Middleware } from "redux";
import { RootState } from "../rootReducer";
import { SetModuleLoadingStatusCreator } from "./loadingActions";



export const loadingMiddleware: Middleware<Dispatch, RootState> = (api) => (next) => (action: Action<string>) => {
  const result = next(action);
  if (action.type.endsWith("_SUCCESS_REQ") || action.type.endsWith("_FAIL_REQ")) {
    // network request complete
    api.dispatch(SetModuleLoadingStatusCreator(action.type, false));
  } else if (action.type.endsWith("_REQ")) {
    // network request initiated
    api.dispatch(SetModuleLoadingStatusCreator(action.type, true));
  }

  return result;
}
