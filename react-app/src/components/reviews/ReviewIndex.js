import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, fetchRecentReviews } from '../../store/reviews';
import ReviewIndexItem from './ReviewIndexItem';

import './ReviewIndex.css';

const ReviewIndex = ({ beer }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  let beerReviews = reviews.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (b.createdAt < a.createdAt) {
      return -1;
    }
    return 0;
  });
  if (beer) {
    beerReviews = beerReviews.filter(review => review.beerId === beer.id);
  }

  useEffect(() => {
    if (beer) {
      dispatch(fetchReviews(beer.id));
    } else {
      dispatch(fetchRecentReviews());
    }
  }, [dispatch, beer]);

  if (beerReviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className='beer-name-detail-page'>Recent Activity</div>
      <ul>
        {beerReviews.map(review => (
          <li key={review.id}>
            <ReviewIndexItem review={review} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewIndex;
