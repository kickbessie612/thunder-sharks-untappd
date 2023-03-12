import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { authenticate } from './store/session';
import { getBreweries } from './store/brewery';
import Navigation from './components/Navigation';
import BeerIndex from './components/beers/BeerIndex';
import BeerShow from './components/beers/BeerShow';
import CreateBeerForm from './components/beers/CreateBeerForm';
import EditBeerForm from './components/beers/EditBeerForm';
import BreweryIndex from './components/Brewery/BreweryIndex';
import CreateBreweryForm from './components/Brewery/BreweryForm';
import BreweryProfilePage from './components/Brewery/BreweryProfilePage';
import EditBreweryFrom from './components/Brewery/EditBreweryForm';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getBreweries());
    document.body.className = theme;
  }, [dispatch, theme]);

  return (
    <>
      <Navigation isLoaded={isLoaded} toggleTheme={toggleTheme} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
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

          <Route exact path='/beers'>
            <BeerIndex />
          </Route>

          <Route exact path='/breweries'>
            <BreweryIndex />
          </Route>

          <Route exact path='/breweries/new'>
            <CreateBreweryForm />
          </Route>

          <Route exact path={`/breweries/:breweryId`}>
            <BreweryProfilePage />
          </Route>

          <Route exact path={`/breweries/:breweryId/edit`}>
            <EditBreweryFrom />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
