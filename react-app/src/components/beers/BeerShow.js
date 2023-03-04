import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchBeer, deleteBeer } from '../../store/beers';
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
        {beer.name},{beer.year}
      </h2>
      <div>{beer.description}</div>
      <div>
        abv:{beer.abv}, ibu:{beer.ibu}, style:{beer.style}
      </div>
      <div>
        <img src={beer.label} alt={beer.name} />
        {/* {spot.SpotImages.map(image => (
          <img src={image.url} key={image.id} />
        ))} */}
      </div>
      <div>{beer.brewery_id}</div>
      <hr />

      {sessionUser && beer.user_id === sessionUser.id && (
        <>
          <div>
            <Link to={`/beers/${beer.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      <hr />

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
