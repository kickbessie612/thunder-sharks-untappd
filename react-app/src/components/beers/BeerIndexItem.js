import { Link } from 'react-router-dom';
import './BeerIndex.css';

const BeerIndexItem = ({ beer }) => {
  return (
    <div className='beer-detail'>
      <Link to={`/beers/${beer.id}`}>
        <div className='beer-image-container'>
          <img className='beer-img' src={beer.label} alt={beer.name} />
        </div>
        <div className='beer-name'>{beer.name}</div>
      </Link>
      <div className='beer-list-attributes'>
        {beer.abv}% ABV | Rating: {beer.averageRating}
      </div>

      <Link to={`/breweries/${beer.brewery.id}`}>
        <div className='beer-list-brewery'>from {beer.brewery.name}</div>
      </Link>
    </div>
  );
};

export default BeerIndexItem;
