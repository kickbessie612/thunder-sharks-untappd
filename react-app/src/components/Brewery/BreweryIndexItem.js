import { useDispatch } from 'react-redux';
import './BreweryForm.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteBrewery } from '../../store/brewery';

const BreweryIndexItem = ({ brewery, currentUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this brewery?')) return;
    await dispatch(deleteBrewery(brewery.id));
    history.push('/breweries');
  };
  return (
    <div className='brewery-box'>
      <ul className='brewery-card'>
       <Link to={`/breweries/${brewery.id}`}>
        <div className='brewery-links'>

          <h1 className='brewery-font'>
            {brewery.name}
          </h1>
        <img src={brewery.picture} alt={`Brewery: ${brewery.name}`} />

        </div>
          </Link>
          <p>{brewery.city}, {brewery.state}</p>
        <p>Description: {brewery.description}</p>
      </ul>

      <div className='brewery-buttons'>
        <button>
          <Link to={`/breweries/${brewery.id}/edit`}>Edit</Link>
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default BreweryIndexItem;
