
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';
import { MapPin, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import { useToast } from '../hooks/use-toast';
import BlogCard from '../components/BlogCard';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      // Get blogs from localStorage or use mockData as fallback
      const storedBlogs = localStorage.getItem('blogs');
      const loadedBlogs = storedBlogs ? JSON.parse(storedBlogs) : blogPosts;
      
      // Find the specific blog by ID
      const foundBlog = loadedBlogs.find((blog: BlogPost) => blog.id === id);
      setBlog(foundBlog || null);
      
      // Find related blogs (same location, excluding current blog)
      if (foundBlog) {
        const related = loadedBlogs
          .filter((post: BlogPost) => post.location === foundBlog.location && post.id !== foundBlog.id)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
      
      // Scroll to top on page load
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.description,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback
        copyToClipboard();
      });
    } else {
      // Fallback
      copyToClipboard();
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The link to this story has been copied to your clipboard.",
    });
  };
  
  const handleBookmark = () => {
    toast({
      title: "Story bookmarked!",
      description: "This story has been saved to your bookmarks.",
    });
  };
  
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-wanderlust-navy mb-4">Story not found</h2>
          <p className="text-gray-600 mb-6">The story you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-wanderlust-teal hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all stories
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-3">
              <MapPin size={16} className="mr-1" />
              <span>{blog.location}</span>
              <span className="mx-2">•</span>
              <Calendar size={16} className="mr-1" />
              <span>{blog.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {blog.title}
            </h1>
            
            <p className="text-white/90 text-lg max-w-3xl">
              {blog.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-wanderlust-teal hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all stories
          </Link>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleShare}
              className="inline-flex items-center text-gray-600 hover:text-wanderlust-teal transition-colors"
            >
              <Share2 size={18} className="mr-1" />
              <span className="text-sm">Share</span>
            </button>
            
            <button 
              onClick={handleBookmark}
              className="inline-flex items-center text-gray-600 hover:text-wanderlust-teal transition-colors"
            >
              <Bookmark size={18} className="mr-1" />
              <span className="text-sm">Save</span>
            </button>
          </div>
        </div>
        
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-serif font-bold text-wanderlust-navy mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Stories */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-serif font-bold text-wanderlust-navy mb-6">
              More Stories from {blog.location}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog.id} className="animate-fade-in">
                  <BlogCard blog={relatedBlog} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
