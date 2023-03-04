import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./BreweryForm.css";

function BreweryFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
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
      picture,
    };

    const newBrewery = await dispatch(createBrewery(payload))
      .then((brewery) => history.push(`/breweries/${brewery.id}`))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors, "DATAAA for ERRORSSS");
        if (data && data.errors) setErrors(data.errors);
      });

    //     //   const data = await dispatch(
    //     //     brewery(name, address, city, state, country, type, description, picture)
    //     //   );
    //     //   if (data) {
    //     //     setErrors(data);
    //     //   }
    //     // } else {
    //     //   setErrors([
    //     //     'Confirm Password field must be the same as the Password field'
    //     //   ]);
    //     // }
    //   };

    // ******* CANCEL BUTTON *******
    const handleCancelClick = (e) => {
      e.preventDefault();
      history.push("./");
    };

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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Type
            <input
              type="select"
              value={confirmPassword}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Picture
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </>
    );
  };
}
export default BreweryFormPage;
