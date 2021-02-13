import { combineEpics, ofType, StateObservable } from "redux-observable";
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { ajax } from "rxjs/ajax";
import { RootState } from "../rootReducer";
import { EntitiesTypes } from './entitiesTypes';
import { CompanyProfileResponse } from "../../models/CompanyProfile";
import CompanyProfile from '../../models/CompanyProfile';
import { FetchCompanyProfile, FetchCompanyProfileSuccessCreator } from './entitiesActions';
import { Observable } from "rxjs";


export const FetchCompanyProfileEpic = (
  action$: Observable<FetchCompanyProfile>,
  state$: StateObservable<RootState>,
) => action$.pipe(
  ofType(EntitiesTypes.FETCH_COMPANY_PROFILE),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    const token = state.session.token;
    return ajax.getJSON<CompanyProfileResponse>(`/api/v1/stock/profile2?symbol=${action.symbol}&token=${token}`)
      .pipe(
        mergeMap((res) => {
          const companyProfile = CompanyProfile.fromContract(res);
          return [FetchCompanyProfileSuccessCreator(companyProfile)];
        }),
      );
  }),
);

export const entitiesEpics = combineEpics(
  FetchCompanyProfileEpic,
);
