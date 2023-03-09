import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreweries } from "../../store/brewery";
import BreweryIndexItem from "./BreweryIndexItem";
import "./BreweryForm.css";
import CreateBreweryForm from "./CreateBreweryForm";

const BreweryIndex = () => {
  const dispatch = useDispatch();
  //   const breweries = useSelector(state => state.breweries ? Object.values(state.breweries) : []);
  const breweriesState = useSelector((state) => state.breweries);

  let breweries;
  if (breweriesState) {
    breweries = Object.values(breweriesState);
  }

  console.log(breweries, "BREWWERIESSSSSSS");

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  return breweries ? (
    <>
      <div className="brewery-box">
        {breweries.map((brewery) => (
          <BreweryIndexItem brewery={brewery} key={brewery.id} />
        ))}
      </div>
      <div>
        {/* <CreateBreweryForm /> */}
      </div>
    </>
  ) : null;
};

export default BreweryIndex;
