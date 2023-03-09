// import { useParams, useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";


// import { getBreweries } from "../../store/brewery";
// import { useEffect } from "react";



// const BreweryProfilePage = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();



//     return (
//     <p1>Hello World</p1>
//     )
// }


// export default BreweryProfilePage;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrewery } from "../../store/brewery";
import { useParams } from "react-router-dom"
import BreweryBeerList from "./BreweryBeerList";

const BreweryProfilePage = () => {
  const dispatch = useDispatch();
  const { breweryId } = useParams();
  const brewery = useSelector(state => state.breweries[breweryId]);
console.log(brewery, "BREWERY PROFILE PAGEEEE")

  useEffect(() => {
    dispatch(getBrewery(breweryId));
  }, [dispatch, breweryId]);

  if (!brewery) {
    return null;
  }

  return (
    <div>
      <h2>Brewery Name: {brewery.name}</h2>
      <img src={brewery.picture} alt={brewery.name} />
      <ul>
      <p>Brewery Type: {brewery.type}</p>
      <p>City: {brewery.city}</p>
      <p>Description: {brewery.description}</p>
      {/* <BreweryBeerList /> */}
      </ul>
      {/* <ul>
        {brewery.beers.map(beer => (
          <li key={beer.id}>{beer.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default BreweryProfilePage;
