import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const demoLogin = () => {
    const email = 'demo@aa.io';
    const password = 'password';
    dispatch(login(email, password));
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className='fas fa-user-circle' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='user-info'>{user.username}</li>
            <li className='user-info'>{user.email}</li>
            {/* <li>
              <NavLink to='/beers/new'><button>Add Beer</button></NavLink>
            </li> */}
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText='Log In'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText='Sign Up'
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <button className='demo-button' onClick={demoLogin}>
                Demo
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
