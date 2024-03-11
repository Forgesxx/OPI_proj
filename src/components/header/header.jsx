import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import CartImg from '../img/cart.png';
import Logo from '../img/logo.png';
import ProfileImg from '../img/account.png';

const Header = () => {
  return (
    <header className="header">
      <Link to="/OPI_proj/mainScreenMovies">
        <img src={Logo} alt="Logo" style={{ width: '75px', height: '75px' }} />
      </Link>
      <nav className="options">
        <ul>
          <li>
            <Link to="/schedule">Розклад сеансів</Link>
          </li>
          <li>
            <Link to="/search">Пошук фільмів</Link>
          </li>
          <li>
            <Link to="/reviews">Відгуки</Link>
          </li>
          <li>
            <Link to="/promotions">Акції</Link>
          </li>
          <li>
            <Link to="/OPI_proj/mainScreenMovies">Головна</Link>
          </li>
        </ul>
      </nav>
      <div className="cartAndProfileContainer">
        <img src={CartImg} alt="Cart" style={{ width: '30px', height: '30px', marginRight: '30px' }} />
        <Link to="/OPI_proj/profile">
          <img src={ProfileImg} alt="Profile" style={{ width: '30px', height: '30px' }} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
