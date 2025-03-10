import React from 'react';
import MyButton from './all/Button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">
        {/* <img src={''} alt="Logo" className="header-logo-image" /> */}
      </div>

      <nav className="nav">
        <Link to='/dashboard' >
          <p className="nav-link">Dashboard</p>
        </Link>
        <Link to='/transfer' >
          <p className="nav-link">Transfer</p>
        </Link> 
      </nav>

      <div className="header-login">
        <Link to='/logout' >
          <MyButton 
              label={'Logout'} 
              color='secondary'
              />
        </Link>
      </div>
    </header>
  );
};

export default Header;
