import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BreweryForm.css';
import { createBrewery, updateBrewery } from '../../store/brewery';

function BreweryForm({ brewery }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
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
    'Microbrewery',
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
      <h1>{brewery.id ? 'Edit' : 'Create'} Brewery</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type='text'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type='text'
            value={state}
            onChange={e => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type='text'
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Type
          <select onChange={e => setType(e.target.value)}>
            <option value={''}>Brewery Type</option>
            {brewery_types.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Description
          <input
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Picture
          <input
            type='text'
            value={picture}
            onChange={e => setPicture(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Submit</button>
        {/* <button type="button" onClick={handleCancelClick}>
            Cancel
          </button> */}
      </form>
    </>
  );
}

export default BreweryForm;
