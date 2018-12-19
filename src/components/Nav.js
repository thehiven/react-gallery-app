import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="main-nav">
        <ul>
          <li onClick={() => props.startLoading('cats')}><NavLink to='/cats'>Cats</NavLink></li>
          <li onClick={() => props.startLoading('dogs')}><NavLink to='/dogs'>Dogs</NavLink></li>
          <li onClick={() => props.startLoading('bears')}><NavLink to='/bears'>Bears</NavLink></li>
        </ul>
    </nav>
  );
};

export default Nav;