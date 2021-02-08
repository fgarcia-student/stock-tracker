import { Record } from "immutable"
import { Reducer } from "redux"

export interface EntitiesState {

}

const EntitiesRecord = Record<EntitiesState>({

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