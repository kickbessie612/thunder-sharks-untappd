const SET_REVIEWS = 'reviews/SET_REVIEWS';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const setReviews = reviews => {
  return {
    type: SET_REVIEWS,
    reviews
  };
};

export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
};

// // GET all reviews of current user
// export const fetchMyReviews = () => async dispatch => {
//   const res = await fetch(`/api/me/reviews`);
//   const reviews = await res.json();
//   dispatch(setReviews(reviews));
//   return res;
// };

// GET all reviews based on a beer id
export const fetchReviews = beerId => async dispatch => {
  const res = await fetch(`/api/beers/${beerId}/reviews`);
  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews(data));
  }
  return res;
};

// GET 10 most recent reviews
export const fetchRecentReviews = () => async dispatch => {
  const res = await fetch(`/api/reviews`);
  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews(data));
  }
  return res;
};

// POST create a review
export const createReview = (review, beerId) => async dispatch => {
  const res = await fetch(`/api/beers/${beerId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews([data]));
  }
  return data;
};

//PUT edit a review
export const updateReview = review => async dispatch => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews([data]));
  }
  return data;
};

// DELETE delete a review
export const deleteReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
  return res;
};

const reviewsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_REVIEWS:
      const reviewsObj = {};

      action.reviews.forEach(review => {
        reviewsObj[review.id] = review;
      });
      newState = { ...newState, ...reviewsObj };
      return newState;

    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
