import React from 'react';
import './header.css'
import CartImg from '../img/cart.png'
import Logo from '../img/logo.png'
const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" style={{ width: '75px', height: '75px' }}/>
      <nav className="options">
        <ul>
          <li>Розклад сеансів</li>
          <li>Пошук фільмів</li>
          <li>Відгуки</li>
          <li>Акції</li>
        </ul>
      </nav>

      <img src={CartImg} alt='Cart' style={{ width: '30px', height: '30px' }}/>

    </header>
  );
}

export default Header;