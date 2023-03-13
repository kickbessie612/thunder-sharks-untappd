import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrewery, deleteBrewery } from '../../store/brewery';
import { useParams, useHistory, Link } from 'react-router-dom';
import BreweryBeerList from './BreweryBeerList';

import './BreweryProfilePage.css';

const BreweryProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { breweryId } = useParams();
  const brewery = useSelector(state => state.breweries[breweryId]);

  useEffect(() => {
    dispatch(getBrewery(breweryId));
  }, [dispatch, breweryId]);

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this brewery?')) return;
    await dispatch(deleteBrewery(breweryId));
    history.push('/breweries');
  };

  if (!brewery) {
    return null;
  }

  return (
    <>
      <h1 className='beer-detail-introduction'>
        A brewery to&nbsp;<span>dive</span> in
      </h1>

      <div className='beer-details-container'>
        <div className='beer-details'>
          <h2 className='beer-name-detail-page'>{brewery.name}</h2>
          <div className='beer-detail-attributes'>
            {brewery.type} from {brewery.city}
          </div>
          <hr />
          <div className='beer-detail-attributes'>
            Description: {brewery.description}
          </div>
          <hr />

          {sessionUser && brewery.userId === sessionUser.id && (
            <div>
              <button>
                <Link to={`/breweries/${brewery.id}/edit`}>Edit</Link>
              </button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <hr />

          <img
            className='beer-show-img'
            src={brewery.picture}
            alt={brewery.name}
          />
        </div>

        <div className='beer-detail-review-container'>
          <BreweryBeerList />
        </div>
      </div>
    </>
  );
};

export default BreweryProfilePage;
