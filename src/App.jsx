import React, { useState } from 'react';
import Login from './components/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Login handler
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('home');
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
  };

  // Navigation component
  const Navigation = () => (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-600">PCOS Health</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                currentPage === 'home'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                currentPage === 'about'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                currentPage === 'contact'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Hi, {user?.firstName || 'User'}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-200 ${
                currentPage === 'home'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-200 ${
                currentPage === 'about'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-200 ${
                currentPage === 'contact'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return <Home />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show navigation only if not on login page */}
      {currentPage !== 'login' && <Navigation />}
      
      {/* Main content */}
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;