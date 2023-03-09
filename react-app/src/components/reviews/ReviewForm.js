import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createReview, updateReview, deleteReview } from '../../store/reviews';

import './ReviewForm.css';

const ReviewForm = ({ review = { rating: '', body: '', image: '' }, beer }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(review.rating);
  const [body, setBody] = useState(review.body);
  const [image, setImage] = useState(review.image);
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    const payload = { ...review, rating, body, image };

    const action = beer ? createReview : updateReview;
    const beerId = beer ? beer.id : review.beerId;
    dispatch(action(payload, beerId)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleDelete = e => {
    e.preventDefault();
    setErrors([]);

    if (!window.confirm('Do you want to delete this review?')) return;

    dispatch(deleteReview(review.id)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <input
          type='number'
          step='0.25'
          required
          value={rating}
          placeholder='rating'
          onChange={e => setRating(e.target.value)}
        />
        <input
          type='text'
          required
          value={body}
          placeholder='body'
          onChange={e => setBody(e.target.value)}
        />
        <input
          type='text'
          value={image}
          placeholder='image url'
          onChange={e => setImage(e.target.value)}
        />
      </div>
      <div>
        <button>{review.id ? 'Update' : 'Create'}</button>

        {review.id && <button onClick={handleDelete}>Delete</button>}
      </div>
    </form>
  );
};

export default ReviewForm;
