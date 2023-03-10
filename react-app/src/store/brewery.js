const LOAD_BREWERIES = 'breweries/LOAD_breweries';
const ADD_BREWERY = 'breweries/ADD_brewery';
// const REMOVE_BREWERY = "breweries/REMOVE_brewery";

<<<<<<< HEAD
export const loadBreweries = breweries => {
  console.log(breweries, 'HEYYYY');
=======
export const loadBreweries = (breweries) => {
  console.log(breweries, "HEYYYY")
>>>>>>> frontend-nav
  return {
    type: LOAD_BREWERIES,
    breweries
  };
};

export const addBreweries = payload => {
  return {
    type: ADD_BREWERY,
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
  if (res.ok) {
    const data = await res.json();
    console.log(data, 'THUNK BREWERIESS');
    if (data.errors) {
      return;
    }
<<<<<<< HEAD
    console.log(data, 'DATAAA BREWERIESSS');
=======
    console.log(data, "DATAAA BREWERIESSS")
>>>>>>> frontend-nav
    dispatch(loadBreweries(data));
  }
};

// GET a brewery by id
export const getBrewery = breweryId => async dispatch => {
  const res = await fetch(`/api/breweries/${breweryId}`);
  const brewery = await res.json();
  dispatch(getBreweries([brewery]));
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

// // PUT edit a brewery
// export const updateBrewery = (brewery) => async (dispatch) => {
//   const res = await fetch(`/api/breweries/${brewery.id}`, {
//     method: "PUT",
//     body: JSON.stringify(brewery),
//   });

//   const data = await res.json();
//   dispatch(setBreweries([data]));
//   return data;
// };

// //DELETE a brewery
// export const deletebrewery = (breweryId) => async (dispatch) => {
//   const res = await fetch(`/api/breweries/${breweryId}`, {
//     method: "DELETE",
//   });

//   dispatch(removeBrewery(breweryId));
//   return res;
// };

const breweriesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BREWERIES:
<<<<<<< HEAD
      console.log(newState, '**** NEWSTATEEE');
      console.log(action.breweries, '****** ACTION.BREWERIES');

      action.breweries.map(brewery => {
        newState[brewery.id] = brewery;
      });
      console.log(newState, '***** NEWSTATE LOAD BREWEWRIES');
=======
      console.log(newState, "**** NEWSTATEEE")
      console.log(action.breweries, '****** ACTION.BREWERIES')

      action.breweries.map((brewery) => newState[brewery.id] = brewery);
      console.log(newState, "***** NEWSTATE LOAD BREWEWRIES");
>>>>>>> frontend-nav
      return newState;

    case ADD_BREWERY:
      newState[action.payload.id] = action.payload;
<<<<<<< HEAD
      console.log(newState, '***** NEWSTATEEE ADD BREWERY');
=======
      console.log(newState, "***** NEWSTATEEE ADD BREWERY")
>>>>>>> frontend-nav
      return newState;
    default:
      return state;
  }
};
export default breweriesReducer;
