import { Record } from "immutable"
import { Reducer } from "redux"

export interface SessionState {

}

const SessionRecord = Record<SessionState>({

}); 

export const sessionReducer: Reducer<SessionState> = (
  state = SessionRecord(),
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
}