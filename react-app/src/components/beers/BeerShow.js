import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchBeer, deleteBeer } from '../../store/beers';
import ReviewIndex from '../reviews/ReviewIndex';
import ReviewForm from '../reviews/ReviewForm';
// import BookingIndex from '../bookings/BookingIndex';
// import CreateBookingForm from '../bookings/CreateBookingForm';

import './BeerShow.css';

const BeerShow = () => {
  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const { beerId } = useParams();
  const beersObj = useSelector(state => state.beers);

  useEffect(() => {
    dispatch(fetchBeer(beerId));
  }, [dispatch, beerId]);

  const beer = beersObj[beerId];

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this beer?')) return;
    await dispatch(deleteBeer(beerId));
    history.push('/');
  };

  if (!beer) {
    return null;
  }

  return (
    <>
      <h2>
        <div>{beer.name}</div>
        {beer.year > 1950 && <div>{beer.year}</div>}
      </h2>
      <div>{beer.description}</div>
      <div>abv:{beer.abv}</div>
      {beer.ibu > -1 && <div>ibu:{beer.ibu}</div>}

      <div>style:{beer.style}</div>
      <div>
        <img src={beer.label} alt={beer.name} />
      </div>
      <div>{beer.brewery_id}</div>
      <hr />

      {sessionUser && beer.userId === sessionUser.id && (
        <>
          <div>
            <Link to={`/beers/${beer.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      <hr />

      <ReviewIndex beer={beer} />

      <ReviewForm beer={beer} />

      {/* {sessionUser && (
        <div>
          <BookingIndex spot={spot} />
        </div>
      )}

      {sessionUser && spot.ownerId !== sessionUser.id && (
        <>
          <div className='spot-create-booking'>Create a new booking</div>
          <div>
            <CreateBookingForm spot={spot} />
          </div>
        </>
      )} */}
    </>
  );
};

export default BeerShow;
