import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded, toggleTheme }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>
      <NavLink exact to='/'>
        <i className='fa-brands fa-untappd'></i>
        &nbsp;&nbsp;&nbsp;RETAPPD
      </NavLink>
      <div className='divider'></div>

      <NavLink exact to='/beers'>
        Beers
      </NavLink>
      <div className='divider'></div>

      <NavLink exact to='/breweries'>
        Breweries
      </NavLink>
      <div className='divider'></div>

      <NavLink exact to='/reviews'>
        Reviews
      </NavLink>
      <div className='divider'></div>
      {isLoaded && (
        <>
          <div className='profile-button'>
            <ProfileButton user={sessionUser} />
          </div>
          <div className='divider'></div>
        </>
      )}
      <button onClick={toggleTheme} className='main-button theme-button'>
        Theme
      </button>
    </div>
  );
}

export default Navigation;
