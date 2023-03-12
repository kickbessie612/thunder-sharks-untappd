import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers } from '../../store/beers';
import { useParams, Link } from 'react-router-dom';

const BreweryBeerList = () => {
  const { breweryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  const beers = useSelector(state => Object.values(state.beers));
  const brewery = useSelector(state => state.breweries[breweryId]);

  const breweryBeers = beers.filter(
    beer => beer.brewery && beer.brewery.id === Number(breweryId)
  );

  return (
    <>
      <h1>{brewery ? `${brewery.name} Beers` : 'Loading...'}</h1>
      <div className='beer-list-main'>
        {breweryBeers.map(beer => (
          <ul className='beer'>
            <div className='beer-list-box'>
              <div className='brewery-page-beer-list'>
                <Link to={`/beers/${beer.id}`}>
                  <div className='beer-list-link'>
                    <img
                      className='beer-list-img'
                      src={beer.label}
                      alt={beer.name}
                    />
                    <h4>{beer.name}</h4>
                  </div>
                </Link>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};
export default BreweryBeerList;
