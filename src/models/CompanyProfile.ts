import { Record } from "immutable";

export interface CompanyProfileResponse {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

interface CompanyProfileRecord {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export default class CompanyProfile extends Record<CompanyProfileRecord>({
  country: "",
  currency: "",
  exchange: "",
  ipo: "",
  marketCapitalization: 0,
  name: "",
  phone: "",
  shareOutstanding: 0,
  ticker: "",
  weburl: "",
  logo: "",
  finnhubIndustry: "",
}) {
  public static fromContract = (res: CompanyProfileResponse) => new CompanyProfile(res);
}

