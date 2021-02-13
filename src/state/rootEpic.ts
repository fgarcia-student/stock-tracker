import { combineEpics } from "redux-observable";
import { entitiesEpics } from "./entities/entitiesOperations";

export const rootEpic = combineEpics(
  entitiesEpics,
);