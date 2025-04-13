
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component just redirects to the HomePage
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
