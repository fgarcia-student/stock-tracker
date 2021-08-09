import {Record, RecordOf} from 'immutable';
import {Reducer} from "redux"
import {SessionActions} from "./sessionActions";
import {SessionTypes} from './sessionTypes';

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
    case SessionTypes.SET_TOKEN:
      return state.set("token", action.token ?? "");
    default:
      return state;
  }
}