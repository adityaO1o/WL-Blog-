
import { Facebook, Twitter, Instagram, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wanderlust-navy text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-serif font-bold text-white">Wanderlust</span>
              <span className="text-2xl font-serif italic text-wanderlust-teal">Diaries</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sharing personal travel stories and adventures from around the globe. 
              Join us as we explore hidden gems, vibrant cultures, and breathtaking landscapes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Blogs</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info - UPDATED WITH REQUESTED INFO */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:aditya2562sharma@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  aditya2562sharma@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-2" />
                <span className="text-gray-300">Based in Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center text-gray-400 space-y-2">
            <p>&copy; {new Date().getFullYear()} Wanderlust Diaries. All rights reserved.</p>
            <p>
              This website is made by{' '}
              <a 
                href="https://my-portfolio-five-lilac-63.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-wanderlust-teal hover:text-wanderlust-teal/80 transition-colors"
              >
                Aditya Sharma
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
