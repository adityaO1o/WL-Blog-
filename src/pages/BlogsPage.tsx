
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import LocationFilter from '../components/LocationFilter';
import { blogPosts } from '../data/mockData';
import { BlogPost } from '../types';

const BlogsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location') || 'All';
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get blogs from localStorage or use mockData as fallback
    const loadBlogs = () => {
      const storedBlogs = localStorage.getItem('blogs');
      const loadedBlogs = storedBlogs ? JSON.parse(storedBlogs) : blogPosts;
      
      // If no blogs in localStorage, initialize it
      if (!storedBlogs) {
        localStorage.setItem('blogs', JSON.stringify(blogPosts));
      }
      
      setBlogs(loadedBlogs);
      
      // Apply initial location filter
      const filtered = locationParam === 'All' 
        ? loadedBlogs 
        : loadedBlogs.filter((blog: BlogPost) => blog.location.includes(locationParam));
      
      setFilteredBlogs(filtered);
    };
    
    loadBlogs();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [locationParam]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      // If search is cleared, just apply the location filter
      const filtered = locationParam === 'All' 
        ? blogs 
        : blogs.filter((blog: BlogPost) => blog.location.includes(locationParam));
      
      setFilteredBlogs(filtered);
    } else {
      // Filter by both search query and selected location
      let filtered = blogs;
      
      if (locationParam !== 'All') {
        filtered = filtered.filter((blog: BlogPost) => blog.location.includes(locationParam));
      }
      
      const searchResults = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query.toLowerCase()) || 
        blog.description.toLowerCase().includes(query.toLowerCase()) ||
        blog.location.toLowerCase().includes(query.toLowerCase())
      );
      
      setFilteredBlogs(searchResults);
    }
  };

  const handleLocationFilter = (location: string) => {
    // Update URL with new location
    const params = new URLSearchParams(window.location.search);
    if (location === 'All') {
      params.delete('location');
    } else {
      params.set('location', location);
    }
    
    // Filter blogs by location
    const filtered = location === 'All' 
      ? blogs 
      : blogs.filter((blog: BlogPost) => blog.location.includes(location));
    
    // If there's also a search query, apply that filter too
    if (searchQuery) {
      const searchResults = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(searchResults);
    } else {
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-wanderlust-navy mb-4">Travel Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of travel adventures, tips, and cultural insights from around the world.
          </p>
        </div>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Search by title, description, or location..." />
        </div>
        
        <LocationFilter onFilterChange={handleLocationFilter} initialLocation={locationParam} />
        
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="animate-fade-in">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-serif text-wanderlust-navy mb-2">No stories found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
