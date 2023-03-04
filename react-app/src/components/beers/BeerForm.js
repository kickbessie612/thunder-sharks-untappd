import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBeer, updateBeer } from '../../store/beers';

const BeerForm = ({ beer }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState(beer.name);
  const [description, setDescription] = useState(beer.description);
  const [abv, setAbv] = useState(beer.abv);
  const [ibu, setIbu] = useState(beer.ibu);
  const [style, setStyle] = useState(beer.style);
  const [label, setLabel] = useState(beer.label);
  const [year, setYear] = useState(beer.year);

  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      ...beer,
      name,
      description,
      abv,
      ibu,
      style,
      label,
      year
    };

    const action = beer.id ? updateBeer : createBeer;

    dispatch(action(payload))
      .then(newBeer => history.push(`/beers/${newBeer.id}`))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          placeholder='upload beer label image url'
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <input
          type='number'
          placeholder='year'
          value={year}
          onChange={e => setYear(e.target.value)}
        />

        <button>{beer.id ? 'update' : 'create'}</button>
      </form>
    </div>
  );
};

export default BeerForm;
