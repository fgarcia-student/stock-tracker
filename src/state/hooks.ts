import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from './rootReducer';

export const useMapState: TypedUseSelectorHook<RootState> = useSelector;