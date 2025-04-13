
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[90vh] bg-wanderlust-navy overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Travel Adventure"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wanderlust-navy/60 to-wanderlust-navy/90"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight animate-fade-in">
          <span className="block">Explore The World</span>
          <span className="block text-wanderlust-yellow">One Story At A Time</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-8">
          Personal travel experiences, breathtaking destinations, and cultural insights from around the globe.
        </p>
        
        <div className="flex space-x-4 animate-[fadeInUp_0.5s_ease-out_forwards]">
          <a href="/blogs" className="bg-wanderlust-teal text-white px-6 py-3 rounded-md font-semibold hover:bg-wanderlust-teal/90 transition-colors">
            Explore Blogs
          </a>
          <a href="#featured-section" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
            Latest Stories
          </a>
        </div>
        
        <div 
          className="absolute bottom-8 animate-bounce cursor-pointer"
          onClick={scrollToContent}
        >
          <ChevronDown className="text-white" size={32} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
