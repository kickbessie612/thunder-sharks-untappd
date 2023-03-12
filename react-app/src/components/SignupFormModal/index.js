import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { signUp } from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        'Confirm Password field must be the same as the Password field'
      ]);
    }
  };

  return (
    <div className='login-form'>
      <h1>Sign Up</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type='text'
          value={username}
          placeholder='user name'
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type='text'
          value={firstName}
          placeholder='first name'
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <input
          type='text'
          value={lastName}
          placeholder='last name'
          onChange={e => setLastName(e.target.value)}
          required
        />

        <input
          type='password'
          value={password}
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          type='password'
          value={confirmPassword}
          placeholder='password'
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
