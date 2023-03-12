import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers } from '../../store/beers';
import { NavLink } from 'react-router-dom';
import BeerIndexItem from './BeerIndexItem';
import './BeerIndex.css';

const BeerIndex = () => {
  const dispatch = useDispatch();
  const beers = useSelector(state => Object.values(state.beers));

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  if (beers.length === 0) {
    return null;
  }

  return (
    <>
      <div className='beer-list'>
        <div className='beer-list-text'>
          <h1 className='introduction'>Popular Beer</h1>
          <div className='subtitle-container'>
            <div>"A drunk tongue is an honest one in my opinion."</div>
            <div className='people-name'>----Adele</div>
            <NavLink to='/beers/new'>
              <button className='add-beer-button'>Add Beer</button>
            </NavLink>
          </div>
        </div>
        <div className='beer-index'>
          {beers.map(beer => (
            <BeerIndexItem beer={beer} key={beer.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BeerIndex;
