import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded, toggleTheme }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <NavLink exact to="/"><i className="fa-brands fa-untappd">UNTAPPD</i></NavLink>
      <button className='main-button'><NavLink exact to="/breweries">Breweries</NavLink></button>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}

export default Navigation;
