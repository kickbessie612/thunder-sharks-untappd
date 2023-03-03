const SET_BEERS = 'beers/SET_BEERS';
const REMOVE_BEER = 'beers/REMOVE_BEER';

export const setBeers = beers => {
  return {
    type: SET_BEERS,
    beers
  };
};

export const removeBeer = beerId => {
  return {
    type: REMOVE_BEER,
    beerId
  };
};

// GET all beers
export const fetchBeers = () => async dispatch => {
  const res = await fetch('/api/beers');
  const beers = await res.json();
  dispatch(setBeers(beers));
  return res;
};

// GET a beer by id
export const fetchBeer = beerId => async dispatch => {
  const res = await fetch(`/api/beers/${beerId}`);
  const beer = await res.json();
  dispatch(setBeers([beer]));
  return res;
};

// POST create a beer
export const createBeer = beer => async dispatch => {
  const res = await fetch('/api/beers', {
    method: 'POST',
    body: JSON.stringify(beer)
  });

  const data = await res.json();
  dispatch(setBeers([data]));
  return data;
};

// PUT edit a beer
export const updateBeer = beer => async dispatch => {
  const res = await fetch(`/api/beers/${beer.id}`, {
    method: 'PUT',
    body: JSON.stringify(beer)
  });

  const data = await res.json();
  dispatch(setBeers([data]));
  return data;
};

//DELETE a beer
export const deleteBeer = beerId => async dispatch => {
  const res = await fetch(`/api/beers/${beerId}`, {
    method: 'DELETE'
  });

  dispatch(removeBeer(beerId));
  return res;
};

const beersReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_BEERS:
      const beersObj = {};

      action.beers.forEach(beer => {
        beersObj[beer.id] = beer;
      });
      newState = { ...newState, ...beersObj };

      return newState;
    case REMOVE_BEER:
      delete newState[action.beerId];
      return newState;
    default:
      return state;
  }
};

export default beersReducer;
