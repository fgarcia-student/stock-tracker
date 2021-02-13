export const SetTokenCreator = (token?: string) => ({
  token,
  type: "@session/SET_TOKEN"
});

export type SetToken = ReturnType<typeof SetTokenCreator>;

export type SessionActions = (
  SetToken
);