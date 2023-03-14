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
import CreateBreweryForm from './components/Brewery/CreateBreweryForm';
import BreweryProfilePage from './components/Brewery/BreweryProfilePage';
import EditBreweryFrom from './components/Brewery/EditBreweryForm';
import Home from './components/Home';
import ReviewFeed from './components/reviews/ReviewFeed';

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
      <div>
        <Navigation isLoaded={isLoaded} toggleTheme={toggleTheme} />
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/reviews'>
              <ReviewFeed />
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
      </div>
      <div className='footer'>
        Contributors:&nbsp;&nbsp;&nbsp;Cavin Timothy &nbsp;
        <a href='https://www.linkedin.com/in/cavin-timothy//'>Linkedin</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/CavinTimothy'>Github</a>
        &nbsp;&nbsp;Cory Baker &nbsp;
        <a href='https://www.linkedin.com/in/cory-baker-9738ba2a'>Linkedin</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/Cbakes24'>Github</a>
        &nbsp;&nbsp;Erena Li&nbsp;
        <a href='https://github.com/erenali22'>Github</a>
        &nbsp;&nbsp;Yuan Wang &nbsp;
        <a href='https://www.linkedin.com/in/yuan-wang-80613052/'>Linkedin</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/kickbessie612'>Github</a>
      </div>
    </>
  );
}

export default App;
