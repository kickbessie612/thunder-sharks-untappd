import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers } from '../../store/beers';
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
      <div>
        {beers.map(beer => (
          <BeerIndexItem beer={beer} key={beer.id} />
        ))}
      </div>
    </>
  );
};

export default BeerIndex;
