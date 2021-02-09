import { LoadingTypes } from './loadingTypes';

export const SetModuleLoadingStatusCreator = (module: string, isLoading: boolean) => ({
  module,
  isLoading,
  type: LoadingTypes.SET_LOADING_STATE as const
});

export type SetModuleLoadingStatus = ReturnType<typeof SetModuleLoadingStatusCreator>;