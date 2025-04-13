
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from the admin panel."
    });
    
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif font-bold text-wanderlust-navy">Wanderlust</span>
              <span className="text-2xl font-serif italic text-wanderlust-teal">Diaries</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-wanderlust-teal border-b-2 border-wanderlust-teal' : 'text-gray-600'} px-3 py-2 text-sm font-medium hover:text-wanderlust-teal transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/blogs" 
              className={`${isActive('/blogs') ? 'text-wanderlust-teal border-b-2 border-wanderlust-teal' : 'text-gray-600'} px-3 py-2 text-sm font-medium hover:text-wanderlust-teal transition-colors`}
            >
              Blogs
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/admin" 
                  className={`${isActive('/admin') ? 'text-wanderlust-teal border-b-2 border-wanderlust-teal' : 'text-gray-600'} px-3 py-2 text-sm font-medium hover:text-wanderlust-teal transition-colors`}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 px-3 py-2 text-sm font-medium hover:text-wanderlust-teal transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`${isActive('/login') ? 'text-wanderlust-teal border-b-2 border-wanderlust-teal' : 'text-gray-600'} px-3 py-2 text-sm font-medium hover:text-wanderlust-teal transition-colors`}
              >
                Admin Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-wanderlust-teal focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-wanderlust-teal bg-gray-50' : 'text-gray-600'} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-wanderlust-teal transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blogs" 
              className={`${isActive('/blogs') ? 'text-wanderlust-teal bg-gray-50' : 'text-gray-600'} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-wanderlust-teal transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/admin" 
                  className={`${isActive('/admin') ? 'text-wanderlust-teal bg-gray-50' : 'text-gray-600'} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-wanderlust-teal transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-wanderlust-teal transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`${isActive('/login') ? 'text-wanderlust-teal bg-gray-50' : 'text-gray-600'} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-wanderlust-teal transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
