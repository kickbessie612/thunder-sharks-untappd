import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	// return (
	// 	<ul>
	// 		<li>
	// 			<NavLink exact to="/">Home</NavLink>
	// 		</li>
	// 		{isLoaded && (
	// 			<li>
	// 				<ProfileButton user={sessionUser} />
	// 			</li>
	// 		)}
	// 	</ul>
	// );

	return (
		<div>
			<nav>
				<NavLink exact to="/"><i class="fa-brands fa-untappd">UNTAPPD</i></NavLink>
				{isLoaded && (<ProfileButton user={sessionUser} />)}
			</nav>
		</div>

	);
}

export default Navigation;
