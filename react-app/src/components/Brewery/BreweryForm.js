import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBrewery, updateBrewery } from '../../store/brewery';

import './BreweryForm.css';

const BreweryForm = ({ brewery }) => {
  console.log(brewery);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(brewery.name);
  const [address, setAddress] = useState(brewery.address);
  const [city, setCity] = useState(brewery.city);
  const [state, setState] = useState(brewery.state);
  const [country, setCountry] = useState(brewery.country);
  const [type, setType] = useState(brewery.type);
  const [description, setDescription] = useState(brewery.description);
  const [picture, setPicture] = useState(brewery.picture);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors([]);
    const payload = {
      ...brewery,
      name,
      address,
      city,
      state,
      country,
      type,
      description,
      picture
    };

    const action = brewery.id ? updateBrewery : createBrewery;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/breweries/${data.id}`);
    }
  };
  const brewery_types = [
    'Micro Brewery',
    'Nano Brewery',
    'Meadery',
    'Contract Brewery',
    'Regional Brewery'
  ];

  // ******* CANCEL BUTTON *******
  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   history.push("./breweries");
  // };

  return (
    <>
      <div>
        {brewery.id ? (
          <>
            <h1 className='introduction'>
              Edit a&nbsp;<span>unique</span>&nbsp;brewery
            </h1>
            <div className='form-description'>
              Tell us about your new discovery!
            </div>
          </>
        ) : (
          <>
            <h1 className='introduction'>
              Add a&nbsp;<span>new</span>&nbsp;brewery
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
          value={name}
          placeholder='Brewery Name'
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type='text'
          value={address}
          placeholder='Address'
          onChange={e => setAddress(e.target.value)}
          required
        />

        <input
          type='text'
          value={city}
          placeholder='City'
          onChange={e => setCity(e.target.value)}
          required
        />

        <input
          type='text'
          value={state}
          placeholder='State'
          onChange={e => setState(e.target.value)}
          required
        />

        <input
          type='text'
          value={country}
          placeholder='Country'
          onChange={e => setCountry(e.target.value)}
          required
        />

        <select onChange={e => setType(e.target.value)}>
          <option value={-0}>Brewery Type</option>
          {brewery_types.map((type, idx) =>
            type === brewery.type ? (
              <option key={idx} value={type} selected>
                {type}
              </option>
            ) : (
              <option key={idx} value={type}>
                {type}
              </option>
            )
          )}
        </select>

        <input
          type='text'
          value={description}
          placeholder='Description'
          onChange={e => setDescription(e.target.value)}
          required
        />

        <input
          type='text'
          value={picture}
          placeholder='Brewery Logo Url'
          onChange={e => setPicture(e.target.value)}
          required
        />

        <button type='submit'>Submit</button>
        {/* <button type="button" onClick={handleCancelClick}>
            Cancel
          </button> */}
      </form>
    </>
  );
};

export default BreweryForm;
