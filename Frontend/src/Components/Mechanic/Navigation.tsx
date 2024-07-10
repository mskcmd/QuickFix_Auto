import React, { useState } from "react";

interface NavigationProps {
  setActiveMenuItem: (item: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setActiveMenuItem }) => {
  const menuItems = ['Dashboard', 'Customers', 'Service', 'Bookings', 'Payments', 'Blog'];
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setActiveMenuItem(item);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center mt-2">
      <nav className="bg-black w-full md:w-[80%] shadow-lg rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <span className="text-white font-bold">{activeItem}</span>
          </div>
          <ul className={`md:flex md:justify-between md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
            {menuItems.map((item) => (
              <li key={item} className="relative group">
                <a
                  href="#"
                  onClick={() => handleItemClick(item)}
                  className={`block px-4 py-3 transition duration-300 ease-in-out ${
                    activeItem === item 
                      ? 'text-purple-300'
                      : 'text-white hover:text-purple-200'
                  }`}
                >
                  {item}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-1 bg-purple-300 transform transition-transform duration-300 ease-in-out ${
                      activeItem === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  ></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
