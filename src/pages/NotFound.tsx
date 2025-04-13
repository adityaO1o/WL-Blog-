
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-serif font-bold text-wanderlust-navy">404</h1>
        <p className="mt-4 text-xl text-gray-600 mb-8">
          Oops! We can't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page might have been removed or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-wanderlust-teal hover:bg-wanderlust-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wanderlust-teal"
        >
          <Home size={18} className="mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
