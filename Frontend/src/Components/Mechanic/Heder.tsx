import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-gray-900 p-2 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-300">
            <span className="text-white text-sm sm:text-xl font-bold">MG</span>
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">MG Service Store</span>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavButton icon="message" count={3} />
          <NavButton icon="notification" count={5} />
          <button 
            onClick={toggleSettings}
            className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300"
          >
            <SettingsIcon />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 p-2 bg-gray-800 rounded-lg">
          <div className="flex justify-around">
            <NavButton icon="message" count={3} />
            <NavButton icon="notification" count={5} />
            <button 
              onClick={toggleSettings}
              className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal toggleSettings={toggleSettings} />
      )}

      {/* Overlay */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSettings}
        ></div>
      )}
    </header>
  );
};

const NavButton: React.FC<{ icon: string; count: number }> = ({ icon, count }) => (
  <button className="relative p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300">
    {icon === "message" ? <MessageIcon /> : <NotificationIcon />}
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{count}</span>
  </button>
);

const MessageIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Message Icon">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const NotificationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Notification Icon">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const SettingsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Settings Icon">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SettingsModal: React.FC<{ toggleSettings: () => void }> = ({ toggleSettings }) => (
  <div className="absolute right-4 top-16 w-64 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50 transform transition-all duration-300 ease-in-out">
    <div className="p-4 bg-purple-600">
      <h3 className="text-lg font-semibold text-white">Settings</h3>
    </div>
    <div className="divide-y divide-gray-700">
      {['Profile', 'Feedback', 'About'].map((item, index) => (
        <button
          key={index}
          className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            {item === 'Profile' && (
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zM5.157 14.85a5 5 0 019.686 0A7.97 7.97 0 0110 18a7.97 7.97 0 01-4.843-1.15z" clipRule="evenodd" />
            )}
            {item === 'Feedback' && (
              <path d="M2 10c0 4.418 4.03 8 9 8 1.24 0 2.42-.234 3.48-.66l2.78.69a1 1 0 001.24-1.24l-.69-2.78A8.001 8.001 0 0020 10c0-4.418-4.03-8-9-8S2 5.582 2 10z" />
            )}
            {item === 'About' && (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 4a6 6 0 100 12A6 6 0 0010 4zm0 9a1 1 0 110 2 1 1 0 010-2zm.073-6a1 1 0 00-.822.435L8.25 8.75A1 1 0 109.75 10.25l.293-.293V13a1 1 0 102 0V9a1 1 0 00-.293-.707l-1.12-1.12A1 1 0 0010.073 7z" clipRule="evenodd" />
            )}
          </svg>
          <span className="text-gray-300">{item}</span>
        </button>
      ))}
    </div>
    <div className="bg-gray-700 p-2">
      <button 
        onClick={toggleSettings}
        className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200"
      >
        Close
      </button>
    </div>
  </div>
);

export default Header;
