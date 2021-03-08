import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { useMapState } from './state/hooks';
import { getComapnyProfiles } from './state/entities/entitiesSelectors';
import { FetchCompanyProfileCreator, FetchCompanyProfileCancelCreator } from './state/entities/entitiesActions';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
