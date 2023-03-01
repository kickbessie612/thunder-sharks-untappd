// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import './BreweryForm.css';

// function BreweryFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
//   const [name, setName] = useState('');
//   const [address, setaddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [type, setType] = useState('');
//   const [description, setDescription] = useState('');
//   const [picture, setPicture] = useState('');
//   const [errors, setErrors] = useState([]);

// //   if (sessionUser) return <Redirect to='/' />;

//   const handleSubmit = async e => {
//     e.preventDefault();
//     // if (password === confirmPassword) {
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

//   return (
//     <>
//       <h1>Create Brewery</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>
//           Name
//           <input
//             type='text'
//             value={name}
//             onChange={e => setName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Username
//           <input
//             type='text'
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           First Name
//           <input
//             type='text'
//             value={firstName}
//             onChange={e => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Last Name
//           <input
//             type='text'
//             value={lastName}
//             onChange={e => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type='password'
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password
//           <input
//             type='password'
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type='submit'>Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default BreweryFormPage;
