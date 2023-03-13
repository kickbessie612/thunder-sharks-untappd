const LOAD_BREWERIES = 'breweries/LOAD_breweries';
const ADD_BREWERY = 'breweries/ADD_brewery';
const REMOVE_BREWERY = 'brewery/REMOVE_BREWERY';
const UPDATE_BREWERY = 'brewery/UPDATE_BREWERY';

export const loadBreweries = breweries => {
  console.log(breweries, 'HEYYYY');
  return {
    type: LOAD_BREWERIES,
    breweries
  };
};

export const removeBrewery = breweryId => {
  return {
    type: REMOVE_BREWERY,
    breweryId
  };
};

export const addBreweries = payload => {
  return {
    type: ADD_BREWERY,
    payload
  };
};

export const editBrewery = payload => {
  return {
    type: UPDATE_BREWERY,
    payload
  };
};

// export const removeBrewery = (breweryId) => {
//   return {
//     type: REMOVE_BREWERY,
//     breweryId
//   };
// };

// GET all breweries
export const getBreweries = () => async dispatch => {
  const res = await fetch('/api/breweries', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(res, 'RESPONSEEEE');
  const data = await res.json();
  if (res.ok) {
    console.log(data, 'THUNK BREWERIESS');

    console.log(data, 'DATAAA BREWERIESSS');
    dispatch(loadBreweries(data));
  }
  return data;
};

// GET a brewery by id
export const getBrewery = breweryId => async dispatch => {
  const res = await fetch(`/api/breweries/${breweryId}`);
  const brewery = await res.json();
  if (res.ok) {
    dispatch(getBreweries([brewery]));
  }
  return res;
};

// POST create a brewery
export const createBrewery = payload => async dispatch => {
  const res = await fetch('/api/breweries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const brewery = await res.json();
  if (res.ok) {
    dispatch(addBreweries(brewery));
  }

  return brewery;
};

// PUT edit a brewery
export const updateBrewery = brewery => async dispatch => {
  const res = await fetch(`/api/breweries/${brewery.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(brewery)
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(editBrewery(data));
  }

  return data;
};

//DELETE a brewery
export const deleteBrewery = breweryId => async dispatch => {
  const res = await fetch(`/api/breweries/${breweryId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeBrewery(breweryId));
  }
  return res;
};

const breweriesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BREWERIES:
      console.log(newState, '**** NEWSTATEEE');
      console.log(action.breweries, '****** ACTION.BREWERIES');

      action.breweries.map(brewery => (newState[brewery.id] = brewery));
      console.log(newState, '***** NEWSTATE LOAD BREWEWRIES');
      return newState;

    case ADD_BREWERY:
      newState[action.payload.id] = action.payload;
      console.log(newState, '***** NEWSTATEEE ADD BREWERY');
      return newState;

    case UPDATE_BREWERY:
      newState[action.payload.id] = action.payload;
      console.log(newState, '***** UPDATE BREWERY');
      return newState;

    case REMOVE_BREWERY:
      delete newState[action.breweryId];
      return newState;
    default:
      return state;
  }
};
export default breweriesReducer;
