import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './BreweryForm.css';
import { createBrewery } from '../../store/brewery';

function BreweryForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors([]);
    const payload = {
      name,
      address,
      city,
      state,
      country,
      type,
      description,
      picture
    };

    const data = await dispatch(createBrewery(payload));
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
  ]

  // ******* CANCEL BUTTON *******
  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   history.push("./breweries");
  // };

  return (
    <>
      <h1>Create Brewery</h1>
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
              <option key={idx} value={type}>{type}</option>
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
        <button type='submit'>Add Brewery</button>
        {/* <button type="button" onClick={handleCancelClick}>
            Cancel
          </button> */}
      </form>
    </>
  );
}

export default BreweryForm;
