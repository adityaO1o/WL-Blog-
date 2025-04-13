
import { Review } from '../types';
import { Quote } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={review.avatar} 
            alt={review.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif font-bold text-wanderlust-navy">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>
      </div>
      
      <div className="flex-grow relative">
        <Quote className="absolute text-wanderlust-teal/10 -top-1 -left-1" size={40} />
        <p className="text-gray-600 relative z-10 italic">
          "{review.content}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
