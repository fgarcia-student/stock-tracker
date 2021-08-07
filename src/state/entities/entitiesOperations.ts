import { combineEpics } from "redux-observable";
import { EntitiesTypes } from './entitiesTypes';
import { CompanyProfileResponse } from "../../models/CompanyProfile";
import CompanyProfile from '../../models/CompanyProfile';
import { FetchCompanyProfile, FetchCompanyProfileSuccessCreator } from './entitiesActions';
import { ajaxEpicCreator } from '../utils';

const FetchCompanyProfileEpic = ajaxEpicCreator<FetchCompanyProfile>({
  triggerActions: [EntitiesTypes.FETCH_COMPANY_PROFILE],
  requestBuilder: (action) => ({ method: "GET", url: `/api/v1/stock/profile2?symbol=${action.symbol}` }),
  onSuccess: (data: CompanyProfileResponse) => [FetchCompanyProfileSuccessCreator(CompanyProfile.fromContract(data))],
  cancellationActionTypes: [EntitiesTypes.FETCH_COMPANY_PROFILE_CANCEL],
});

export const entitiesEpics = combineEpics(
  FetchCompanyProfileEpic,
);
