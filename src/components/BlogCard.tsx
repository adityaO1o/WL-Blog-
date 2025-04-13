
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { MapPin } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.id}`} className="blog-card block h-full">
      <div className="relative h-full flex flex-col">
        {/* Image */}
        <div className={`relative w-full ${featured ? 'h-72' : 'h-56'} overflow-hidden`}>
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {blog.featured && !featured && (
            <div className="absolute top-4 right-4 bg-wanderlust-teal text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center text-sm text-wanderlust-orange mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{blog.location}</span>
          </div>
          
          <h3 className={`font-serif font-bold text-wanderlust-navy mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {blog.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {blog.description}
          </p>
          
          <div className="mt-auto">
            <span className="text-wanderlust-teal text-sm font-medium">
              Read more
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
