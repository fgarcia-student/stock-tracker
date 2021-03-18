import { SessionTypes } from './sessionTypes';
export const SetTokenCreator = (token?: string) => ({
  token,
  type: SessionTypes.SET_TOKEN as const,
});

export type SetToken = ReturnType<typeof SetTokenCreator>;

export type SessionActions = (
  SetToken
);