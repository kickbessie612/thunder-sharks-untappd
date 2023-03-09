import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';

import BeerIndex from './components/beers/BeerIndex';
import BreweryIndex from './components/Brewery/BreweryIndex';
import BreweryFormPage from './components/Brewery/BreweryFormPage';
import BreweryProfilePage from './components/Brewery/BreweryProfilePage';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <BeerIndex />
          </Route>

          <Route path='/login'>
            <LoginFormPage />
          </Route>

          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route exact path='/breweries'>
            <BreweryIndex />
          </Route>
          {/* <Route exact path='/breweries/create'>
            <BreweryFormPage />
          </Route> */}
          <Route exact path={`/breweries/:breweryId`}>
            <BreweryProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
