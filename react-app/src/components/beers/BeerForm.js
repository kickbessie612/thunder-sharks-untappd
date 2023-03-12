import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBeer, updateBeer } from '../../store/beers';

const BeerForm = ({ beer }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const breweries = useSelector(state => Object.values(state.breweries));

  const [name, setName] = useState(beer.name);
  const [description, setDescription] = useState(beer.description);
  const [abv, setAbv] = useState(beer.abv);
  const [ibu, setIbu] = useState(beer.ibu ? beer.ibu : '');
  const [style, setStyle] = useState(beer.style);
  const [label, setLabel] = useState(beer.label);
  const [year, setYear] = useState(beer.year ? beer.year : '');
  const [brewery_id, setBreweryId] = useState(
    beer.brewery ? beer.brewery.id : ''
  );

  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...beer,
      name,
      description,
      abv,
      ibu: ibu ? ibu : -0,
      style,
      label,
      year: year ? year : -0,
      brewery_id: brewery_id ? brewery_id : -0
    };

    const action = beer.id ? updateBeer : createBeer;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/beers/${data.id}`);
    }
  };

  return (
    <div>
      <div>
        {beer.id ? (
          <>
            <h1 className='introduction'>
              Edit a&nbsp;<span>unique</span>&nbsp;beer
            </h1>
            <div className='form-description'>
              Tell us about your new discovery!
            </div>
          </>
        ) : (
          <>
            <h1 className='introduction'>
              Add a&nbsp;<span>new</span>&nbsp;beer
            </h1>
            <div className='form-description'>
              Tell us about your new discovery!
            </div>
          </>
        )}
      </div>
      <form className='beer-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Description'
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='number'
          placeholder='abv'
          required
          value={abv}
          onChange={e => setAbv(e.target.value)}
        />
        <input
          type='number'
          placeholder='ibu'
          value={ibu}
          onChange={e => setIbu(e.target.value)}
        />
        <input
          type='text'
          placeholder='style'
          required
          value={style}
          onChange={e => setStyle(e.target.value)}
        />
        <input
          type='text'
          placeholder='beer label image url'
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <input
          type='number'
          placeholder='year'
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <select onChange={e => setBreweryId(e.target.value)}>
          <option value={-0}>Select Brewery</option>
          {breweries.map(({ id, name }, idx) =>
            beer.id && beer.brewery && id === beer.brewery.id ? (
              <option key={idx} defaultValue={id} selected>
                {name}
              </option>
            ) : (
              <option key={idx} value={id}>
                {name}
              </option>
            )
          )}
        </select>
        <button>{beer.id ? 'update' : 'create'}</button>
      </form>
    </div>
  );
};

export default BeerForm;
