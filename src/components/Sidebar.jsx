import React, { useState, useEffect } from 'react';
import sidebarStyles from '../styles/sidebar.module.css';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsOpen(true); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
      {isMobile && (
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      )}
      {isOpen && (
        <nav className="sidebar-nav">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
