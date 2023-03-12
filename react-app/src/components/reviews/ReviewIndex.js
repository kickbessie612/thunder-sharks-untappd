import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviews';
import ReviewIndexItem from './ReviewIndexItem';

import './ReviewIndex.css';

const ReviewIndex = ({ beer }) => {
  const dispatch = useDispatch();

  const reviews = useSelector(state => Object.values(state.reviews));

  const beerReviews = reviews.filter(review => review.beerId === beer.id);

  useEffect(() => {
    dispatch(fetchReviews(beer.id));
  }, [dispatch, beer.id]);

  if (beerReviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className='beer-name-detail-page'>Global Recent Activity</div>
      <ul>
        {beerReviews.map(review => (
          <li key={review.id}>
            <ReviewIndexItem review={review} beer={beer} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewIndex;
