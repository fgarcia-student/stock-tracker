import { EntitiesTypes } from './entitiesTypes';
import CompanyProfile from '../../models/CompanyProfile';

export const FetchCompanyProfileCreator = (symbol: string) => ({
  symbol,
  type: EntitiesTypes.FETCH_COMPANY_PROFILE as const,
});

export const FetchCompanyProfileCancelCreator = () => ({
  type: EntitiesTypes.FETCH_COMPANY_PROFILE_CANCEL as const,
})

export const FetchCompanyProfileFailCreator = () => ({
  type: EntitiesTypes.FETCH_COMPANY_PROFILE_FAIL as const,
});

export const FetchCompanyProfileSuccessCreator = (companyProfile: CompanyProfile) => ({
  companyProfile,
  type: EntitiesTypes.FETCH_COMPANY_PROFILE_SUCCESS as const,
});

export type FetchCompanyProfile = ReturnType<typeof FetchCompanyProfileCreator>;
export type FetchCompanyProfileFail = ReturnType<typeof FetchCompanyProfileFailCreator>;
export type FetchCompanyProfileSuccess = ReturnType<typeof FetchCompanyProfileSuccessCreator>;


export type EntitiesActions = (
  FetchCompanyProfile |
  FetchCompanyProfileFail |
  FetchCompanyProfileSuccess
)