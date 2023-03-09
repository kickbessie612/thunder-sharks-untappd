import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';

// import * as sessionActions from './store/session';

import BeerIndex from './components/beers/BeerIndex';
import BeerShow from './components/beers/BeerShow';
import CreateBeerForm from './components/beers/CreateBeerForm';
import EditBeerForm from './components/beers/EditBeerForm';
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

          <Route path='/beers/new'>
            <CreateBeerForm />
          </Route>

          <Route exact path='/beers/:beerId'>
            <BeerShow />
          </Route>

          <Route path='/beers/:beerId/edit'>
            <EditBeerForm />
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
