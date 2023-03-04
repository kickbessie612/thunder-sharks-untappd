const SET_BREWERIES= 'breweries/SET_breweries';
const REMOVE_BREWERY = 'breweries/REMOVE_brewery';

export const setBreweries = breweries => {
  return {
    type: SET_breweries,
    breweries
  };
};

export const removeBrewery = breweryId => {
  return {
    type: REMOVE_brewery,
    breweryId
  };
};

// GET all breweries
export const fetchBreweries = () => async dispatch => {
  const res = await fetch('/api/breweries', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }

    dispatch(setBreweries(data));
  }
};

// GET a brewery by id
export const fetchBrewery = breweryId => async dispatch => {
  const res = await fetch(`/api/breweries/${breweryId}`);
  const brewery = await res.json();
  dispatch(setBreweries([brewery]));
  return res;
};

// POST create a brewery
export const createBrewery = brewery => async dispatch => {
  const res = await fetch('/api/breweries', {
    method: 'POST',
    body: JSON.stringify(brewery)
  });

  if(res.ok) {

      const brewery = await res.json();
      dispatch(setBreweries([brewery]));
      return brewery;
  }
  return res
};

// PUT edit a brewery
export const updateBrewery = brewery => async dispatch => {
  const res = await fetch(`/api/breweries/${brewery.id}`, {
    method: 'PUT',
    body: JSON.stringify(brewery)
  });

  const data = await res.json();
  dispatch(setBreweries([data]));
  return data;
};

//DELETE a brewery
export const deletebrewery = breweryId => async dispatch => {
  const res = await fetch(`/api/breweries/${breweryId}`, {
    method: 'DELETE'
  });

  dispatch(removeBrewery(breweryId));
  return res;
};

const breweriesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_BREWERIES:
      const breweriesObj = {};

      action.breweries.forEach(brewery => {
        breweriesObj[brewery.id] = brewery;
      });
      newState = { ...newState, ...breweriesObj };

      return newState;
    case REMOVE_BREWERY:
      delete newState[action.breweryId];
      return newState;
    default:
      return state;
  }
};

export default breweriesReducer;
