
import { useState, useEffect } from 'react';
import { getLocationNames } from '../data/mockData';

interface LocationFilterProps {
  onFilterChange: (location: string) => void;
  initialLocation?: string;
}

const LocationFilter = ({ onFilterChange, initialLocation = 'All' }: LocationFilterProps) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useEffect(() => {
    setLocations(getLocationNames());
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onFilterChange(location);
  };

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {locations.map((location) => (
        <button
          key={location}
          onClick={() => handleLocationChange(location)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedLocation === location
              ? 'bg-wanderlust-teal text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {location}
        </button>
      ))}
    </div>
  );
};

export default LocationFilter;
