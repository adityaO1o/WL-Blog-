import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import BlogCard from '../components/BlogCard';
import LocationCard from '../components/LocationCard';
import ReviewCard from '../components/ReviewCard';
import { BlogPost } from '../types';
import { blogPosts, locations, reviews } from '../data/mockData';
import { Globe, Map, Camera, Users, Award, Zap } from 'lucide-react';

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadFeaturedBlogs = () => {
      const storedBlogs = localStorage.getItem('blogs');
      if (storedBlogs) {
        const allBlogs = JSON.parse(storedBlogs);
        const featured = allBlogs.filter((blog: BlogPost) => blog.featured);
        setFeaturedBlogs(featured.slice(0, 3));
      } else {
        const featured = blogPosts.filter(blog => blog.featured);
        setFeaturedBlogs(featured.slice(0, 3));
        localStorage.setItem('blogs', JSON.stringify(blogPosts));
      }
    };
    
    loadFeaturedBlogs();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      
      <section id="featured-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-wanderlust-navy mb-4">Featured Travel Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in our most inspiring adventures and discoveries from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.length > 0 ? (
              featuredBlogs.map((blog) => (
                <div key={blog.id} className="animate-fade-in">
                  <BlogCard blog={blog} />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No featured stories yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-wanderlust-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-wanderlust-navy mb-4">Why Explore With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes Wanderlust Diaries different from other travel blogs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-teal/10 text-wanderlust-teal mb-4">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">
                Real stories from real travelers, focusing on authentic local experiences rather than tourist traps.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in [animation-delay:100ms]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-orange/10 text-wanderlust-orange mb-4">
                <Camera size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Visual Storytelling</h3>
              <p className="text-gray-600">
                Breathtaking photography and immersive content that transports you to each destination.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in [animation-delay:200ms]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-yellow/10 text-wanderlust-yellow mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Join a community of passionate travelers sharing insights, tips, and inspiration.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in [animation-delay:300ms]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-teal/10 text-wanderlust-teal mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Travel Hacks</h3>
              <p className="text-gray-600">
                Insider tips and tricks to help you travel smarter, cheaper, and more efficiently.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in [animation-delay:400ms]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-navy/10 text-wanderlust-navy mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Curated Excellence</h3>
              <p className="text-gray-600">
                Carefully selected destinations and experiences that meet our high standards for quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in [animation-delay:500ms]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wanderlust-orange/10 text-wanderlust-orange mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-wanderlust-navy mb-2">Global Perspective</h3>
              <p className="text-gray-600">
                Diverse stories from all corners of the world, celebrating different cultures and viewpoints.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 hero-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-wanderlust-navy mb-2">Explore Destinations</h2>
              <p className="text-gray-600 max-w-2xl">
                Discover stories from fascinating locations across continents.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="/blogs" 
                className="inline-flex items-center text-wanderlust-teal hover:text-wanderlust-teal/80 transition-colors"
              >
                <span className="mr-2">View all destinations</span>
                <Globe size={16} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 6).map((location) => (
              <div key={location.id} className="animate-fade-in">
                <LocationCard location={location} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-wanderlust-navy mb-4">Traveler Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what fellow adventurers have to say about their experiences with Wanderlust Diaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="animate-fade-in">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-wanderlust-navy text-white mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated on New Adventures</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to receive updates about new travel stories, tips, and exclusive content.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-wanderlust-teal"
              required
            />
            <button 
              type="submit" 
              className="bg-wanderlust-teal text-white px-6 py-3 rounded-md font-semibold hover:bg-wanderlust-teal/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
