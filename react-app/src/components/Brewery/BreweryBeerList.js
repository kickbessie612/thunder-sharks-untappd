import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import AddSongForm from "./SongForm";

const BreweryBeerList = () => {
  const { breweryId } = useParams();
  console.log(breweryId, "BreweryId!!!!!!");

//   const breweries = useSelector((state) => state.breweries);
  const breweries = useSelector(state => Object.values(state.breweries));
  console.log(breweries, "BREWERIRSSS");

//   const beers = useSelector((state) => state.beers);
  const beers = useSelector(state => Object.values(state.beers));
    console.log(beers, 'BEERS')

  const breweryBeers = beers.filter(beer => {
    return beer.breweryId === breweryId
       })
  console.log(breweryBeers, 'BreweryBeers!')

  const brewery = breweries[breweryId];
  console.log(brewery, "Brewery");



//   return <AddSongForm song={song} formType="Edit Song" />;
return (
    <>
      <h1>{brewery.name} Beers</h1>
      <div>
        {breweryBeers.map((beer) => (
          <ul className="beer">
            <div>
              <li key={beer.id}>
                {beer.name}
              </li>
              <li>{beer.abv}</li>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
};
export default BreweryBeerList;


// const userSongsArr = songsArr.filter(song => {
//     return song.userId === currentUser.id
//   })
