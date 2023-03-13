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
  }, [dispatch, beer?.id]);

  if (beerReviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className='beer-detail-introduction'>
        Recent &nbsp;<span>Drink</span> Activity
      </div>
      <div className='review-feed-container'>
        <ul>
          {beerReviews.map(review => (
            <li key={review.id}>
              <ReviewIndexItem review={review} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReviewIndex;
