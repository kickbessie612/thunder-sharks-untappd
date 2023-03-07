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

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...beer,
      name,
      description,
      abv,
      style,
      label
    };
    if (ibu) {
      payload['ibu'] = ibu;
    }
    if (year) {
      payload['year'] = year;
    }
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

        <button>{beer.id ? 'update' : 'create'}</button>
      </form>
    </div>
  );
};

export default BeerForm;
