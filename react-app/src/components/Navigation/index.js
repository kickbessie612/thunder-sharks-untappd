import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>
      <div className='nav-links'>
        <NavLink exact to='/'>
          <i className='fa-brands fa-untappd'>UNTAPPD</i>
        </NavLink>
        <button>
          <NavLink exact to='/beers'>
            Beers
          </NavLink>
        </button>
        <button>
          <NavLink exact to='/breweries'>
            Breweries
          </NavLink>
        </button>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
