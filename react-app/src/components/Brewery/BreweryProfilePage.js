
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrewery, deleteBrewery } from "../../store/brewery";
import { useParams, useHistory } from "react-router-dom"



const BreweryProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { breweryId } = useParams();
  const brewery = useSelector(state => state.breweries[breweryId]);
  console.log(brewery, "BREWERY PROFILE PAGEEEE")

  useEffect(() => {
    dispatch(getBrewery(breweryId));
  }, [dispatch, breweryId]);

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this brewery?')) return;
    await dispatch(deleteBrewery(breweryId));
    history.push('/breweries');
  };

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
      </ul>

      <div>
      <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default BreweryProfilePage;