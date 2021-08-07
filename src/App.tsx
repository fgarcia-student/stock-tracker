import React from 'react';
import { useDispatch } from 'react-redux';
import { useMapState } from './state/hooks';
import { getComapnyProfiles } from './state/entities/entitiesSelectors';
import { FetchCompanyProfileCreator, FetchCompanyProfileCancelCreator } from './state/entities/entitiesActions';
import { HomePage } from './pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const companyProfiles = useMapState(getComapnyProfiles);

  
  React.useEffect(() => {
    dispatch(FetchCompanyProfileCreator("AAPL"));
    // cancel requests
    dispatch(FetchCompanyProfileCancelCreator());
  }, [dispatch]);

  console.log(companyProfiles);

  return (
    <HomePage />
  );
}

export default App;
