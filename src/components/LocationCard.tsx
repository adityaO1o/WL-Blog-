
import { Location } from '../types';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <Link 
      to={`/blogs?location=${location.name}`} 
      className="group relative overflow-hidden rounded-lg shadow-md h-48"
    >
      <img 
        src={location.imageUrl} 
        alt={location.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-serif text-xl font-bold">{location.name}</h3>
        <p className="text-white/80 text-sm">{location.blogCount} {location.blogCount === 1 ? 'story' : 'stories'}</p>
      </div>
    </Link>
  );
};

export default LocationCard;
