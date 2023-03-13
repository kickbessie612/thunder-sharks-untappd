import { useDispatch, useSelector } from 'react-redux';
import './BreweryForm.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteBrewery } from '../../store/brewery';

const BreweryIndexItem = ({ brewery }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className='beer-detail'>
      <Link to={`/breweries/${brewery.id}`}>
        <div className='beer-image-container'>
          <img src={brewery.picture} alt={`Brewery: ${brewery.name}`} />
        </div>
        <div className='beer-name'>{brewery.name}</div>
      </Link>
      <div className='beer-list-brewery'>
        {brewery.city}, {brewery.state}, {brewery.country}
      </div>
      <div className='beer-list-attributes'>{brewery.description}</div>
    </div>
  );
};

export default BreweryIndexItem;
