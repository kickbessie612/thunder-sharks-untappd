// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getBreweries } from '../../store/brewery';
// import BreweryIndexItem from './BreweryIndexItem';
// import './BreweryForm.css';

// const BreweryIndex = () => {
//   const dispatch = useDispatch();
//   console.log( "HELLOOOOOO")
//   const currentUser = useSelector((state) => state.session.user);
//   console.log(currentUser, "CURRENT USER")
//   const breweries = useSelector((state)=> (state.breweries));
// console.log(breweries, "BREWERIESSSS")

//   useEffect(() => {
//     dispatch(getBreweries());
//   }, [dispatch]);

// //   if (breweries.length === 0) {
// //     return null;
// //   }

//   return (
//     <>
//       <div>
//         {breweries.map(brewery => (
//           <BreweryIndexItem brewery={brewery} key={brewery.id} currentUser={currentUser}/>
//         ))}
//       </div>
//     </>
//   );
// };

// export default BreweryIndex;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreweries } from '../../store/brewery';
import BreweryIndexItem from './BreweryIndexItem';
import './BreweryForm.css';
// import BreweryFormPage from './BreweryFormPage';

const BreweryIndex = () => {
  const dispatch = useDispatch();
  //   const breweries = useSelector(state => state.breweries ? Object.values(state.breweries) : []);
  const breweriesState = useSelector(state => (state.breweries))

  let breweries;
  if (breweriesState) {
    breweries = Object.values(breweriesState)
  }

  console.log(breweries, 'BREWWERIESSSSSSS')


  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);


  return breweries ? (
    <>
      <div className='brewery-box'>
        {breweries.map(brewery => (
          <BreweryIndexItem brewery={brewery} key={brewery.id} />
        ))}
      </div>
    </>
  ) : null;
};

export default BreweryIndex;
