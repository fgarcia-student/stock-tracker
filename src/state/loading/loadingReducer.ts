import {Map, Record} from "immutable"
import {Reducer} from "redux"

export interface LoadingState {
  modules: Map<string, boolean>;
}

const LoadingRecord = Record<LoadingState>({
  modules: Map(),
});

export const loadingReducer: Reducer<LoadingState> = (
  state = LoadingRecord(),
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
}