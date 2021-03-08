import { combineEpics } from "redux-observable";
import { EntitiesTypes } from './entitiesTypes';
import { CompanyProfileResponse } from "../../models/CompanyProfile";
import CompanyProfile from '../../models/CompanyProfile';
import { FetchCompanyProfile, FetchCompanyProfileSuccessCreator } from './entitiesActions';
import { ajaxEpicCreator } from '../utils';

const FetchCompanyProfileEpic = ajaxEpicCreator<FetchCompanyProfile>({
  triggerActions: [EntitiesTypes.FETCH_COMPANY_PROFILE],
  urlBuilder: (action) => ({ method: "GET", url: `api/v1/stock/profile2?symbol=${action.symbol}` }),
  onSuccess: (data: CompanyProfileResponse) => [FetchCompanyProfileSuccessCreator(CompanyProfile.fromContract(data))],
});

export const entitiesEpics = combineEpics(
  FetchCompanyProfileEpic,
);
