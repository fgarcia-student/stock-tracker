import React from 'react';
import {useDispatch} from 'react-redux';
import {useMapState} from './state/hooks';
import {getComapnyProfiles} from './state/entities/entitiesSelectors';
import {FetchCompanyProfileCreator} from './state/entities/entitiesActions';
import {HomePage} from './pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const companyProfiles = useMapState(getComapnyProfiles);


  React.useEffect(() => {
    dispatch(FetchCompanyProfileCreator("AAPL"));
  }, [dispatch]);

  console.log(companyProfiles);

  return (
    <HomePage/>
  );
}

export default App;
