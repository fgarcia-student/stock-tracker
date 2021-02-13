import { Record, RecordOf } from 'immutable';
import { Reducer } from "redux"
import { SessionActions } from "./sessionActions";

interface ISessionState {
  token?: string;
}

export type SessionState = RecordOf<ISessionState>;
const SessionRecord = Record<ISessionState>({
  token: "",
}); 

export const sessionReducer: Reducer<SessionState, SessionActions> = (
  state = SessionRecord(),
  action,
) => {
  switch (action.type) {
    case "@session/SET_TOKEN":
      return state.set("token", action.token ?? "");
    default:
      return state;
  }
}