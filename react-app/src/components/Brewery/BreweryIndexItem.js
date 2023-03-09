// import { useDispatch } from "react-redux";
import "./BreweryForm.css";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const BreweryIndexItem = ({ brewery, currentUser }) => {
  //   const dispatch = useDispatch();
  //   const history = useHistory();

  return (
    <div className="brewery-box">
      <ul className="brewery-card">
        <img src={brewery.picture} alt={`Brewery: ${brewery.name}`} />
        <li>ID: {brewery.id}</li>
        <Link to={`/breweries/${brewery.id}`}>
          Brewery Name: {brewery.name}
        </Link>
        <li>Beer LIst</li>
        <li>Description: {brewery.description}</li>
      </ul>

      <div className="brewery-buttons"></div>
    </div>
  );
};

export default BreweryIndexItem;
