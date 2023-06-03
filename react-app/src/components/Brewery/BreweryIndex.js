import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreweries } from "../../store/brewery";
import { NavLink } from "react-router-dom";
import BreweryIndexItem from "./BreweryIndexItem";
import "../beers/BeerIndex.css";

const BreweryIndex = () => {
  const dispatch = useDispatch();
  //   const breweries = useSelector(state => state.breweries ? Object.values(state.breweries) : []);
  const breweriesState = useSelector((state) => state.breweries);

  let breweries;
  if (breweriesState) {
    breweries = Object.values(breweriesState);
  }

  const carouselRef = useRef(null);

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  const slideLeft = () => {
    carouselRef.current.scrollLeft += 400; // Adjust this value to control the scroll distance
  };

  const slideRight = () => {
    carouselRef.current.scrollLeft -= 400; // Adjust this value to control the scroll distance
  };

  return breweries ? (
    <>
      <div className="beer-container">
        <div className="beer-list-text">
          <h1 className="introduction">Popular Breweries</h1>
          <div className="subtitle-container">
            <div>
              "It looks good, it tastes good, and by golly it does you good."
            </div>
            <div className="people-name">----Mackeson's Brewery</div>
            <NavLink to="/breweries/new">
              <button className="add-beer-button">Add Brewery</button>
            </NavLink>
          </div>
        </div>
          <div className="beer-color-block"></div>
          <div className="beer-color-circle"></div>
        <div className="beer-list">
          <div className="carousel-controls">
            <button className="prev-button" onClick={slideRight}>
              Prev
            </button>
            <button className="next-button" onClick={slideLeft}>
              Next
            </button>
          </div>
          <div className="beer-index" ref={carouselRef}>
            {breweries.map((brewery) => (
              <BreweryIndexItem brewery={brewery} key={brewery.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default BreweryIndex;
