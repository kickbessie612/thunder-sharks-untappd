import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreweries } from '../../store/brewery';
import { NavLink } from 'react-router-dom';
import BreweryIndexItem from './BreweryIndexItem';

const BreweryIndex = () => {
  const dispatch = useDispatch();
  //   const breweries = useSelector(state => state.breweries ? Object.values(state.breweries) : []);
  const breweriesState = useSelector(state => state.breweries);

  let breweries;
  if (breweriesState) {
    breweries = Object.values(breweriesState);
  }

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  return breweries ? (
    <>
      <div className='beer-list'>
        <div className='beer-list-text'>
          <div className='beer-color-block'></div>
          <div className='beer-color-circle'></div>
          <h1 className='introduction'>Popular Breweries</h1>
          <div className='subtitle-container'>
            <div>
              "It looks good, it tastes good, and by golly it does you good."
            </div>
            <div className='people-name'>----Mackeson's Brewery</div>
            <NavLink to='/breweries/new'>
              <button className='add-beer-button'>Add Brewery</button>
            </NavLink>
          </div>
        </div>
        <div className='beer-index'>
          {breweries.map(brewery => (
            <BreweryIndexItem brewery={brewery} key={brewery.id} />
          ))}
        </div>
      </div>
    </>
  ) : null;
};

export default BreweryIndex;
