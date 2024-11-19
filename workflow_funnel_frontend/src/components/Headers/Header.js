import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Replace history.push with navigate
  };

  return (
    <header>
      <button onClick={() => handleNavigation('/home')}>
        Go to Home
      </button>
      <button onClick={() => handleNavigation('/about')}>
        Go to About
      </button>
    </header>
  );
};

export default Header;
