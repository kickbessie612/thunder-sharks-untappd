import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrewery, deleteBrewery } from '../../store/brewery';
import { useParams, useHistory, Link } from 'react-router-dom';
import BreweryBeerList from './BreweryBeerList';

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
    <div className='brewery-profile'>
      <h2>Brewery Name: {brewery.name}</h2>
      <img
        className='brewery-index-img'
        src={brewery.picture}
        alt={brewery.name}
      />
      <ul>
        <p>Brewery Type: {brewery.type}</p>
        <p>City: {brewery.city}</p>
        <p>Description: {brewery.description}</p>
      </ul>

      {sessionUser && brewery.userId === sessionUser.id && (
        <div>
          <button>
            <Link to={`/breweries/${brewery.id}/edit`}>Edit</Link>
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <div>
        <BreweryBeerList />
      </div>
    </div>
  );
};

export default BreweryProfilePage;
