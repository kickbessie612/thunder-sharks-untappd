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
      <div className='beer-name-detail-page'>Beers from this brewery</div>
      <div className='beer-list-main'>
        {breweryBeers.map(beer => (
          <Link to={`/beers/${beer.id}`}>
            <div className='brewery-profile-beer-card'>
              <div>
                <img
                  className='brewery-show-img'
                  src={beer.label}
                  alt={beer.name}
                />
              </div>
              <h2 className='beer-detail-attributes'>
                {beer.name} {beer.year ? <> {beer.year}</> : ''}
              </h2>

              <div className='beer-detail-attributes'>
                ABV: {beer.abv} || {beer.ibu ? <>ibu: {beer.ibu},</> : ''}{' '}
                style: {beer.style} || Rating: {beer.averageRating}
              </div>
              <hr />
              <div className='beer-detail-attributes'>{beer.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default BreweryBeerList;
