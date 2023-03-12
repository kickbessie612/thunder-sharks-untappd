import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useState } from 'react';

const ReviewIndexItem = ({ review, beer }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleDelete = async e => {
    e.preventDefault();
    setErrors([]);
    if (!window.confirm('Do you want to delete this review?')) return;
    dispatch(deleteReview(review.id)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='review-title'>
        {beer.brewery ? (
          <div>
            <div>
              {review.user.firstName} is drinking a {beer.name} by{' '}
              {beer.brewery.name} || {review.rating} stars!
            </div>
            <hr />
          </div>
        ) : (
          <div>
            <div>
              {review.user.firstName} is drinking a {beer.name} ||{' '}
              {review.rating} stars!
            </div>
            <hr />
          </div>
        )}
      </div>
      <div className='review-body'>{review.body}</div>
      {sessionUser && review.userId === sessionUser.id && (
        <>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewIndexItem;
