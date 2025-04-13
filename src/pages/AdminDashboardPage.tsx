import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Upload, Save } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { BlogPost } from '../types';
import { useToast } from '../hooks/use-toast';

const AdminDashboardPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    content: '',
    imageAlt: '',
    featured: false
  });
  
  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(isUserLoggedIn);
      
      if (!isUserLoggedIn) {
        navigate('/login');
      }
    };
    
    checkLoginStatus();
    loadBlogs();
  }, [navigate]);
  
  const loadBlogs = () => {
    // Get blogs from localStorage or use mockData as initial data
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(blogPosts);
      // Initialize localStorage with mockData
      localStorage.setItem('blogs', JSON.stringify(blogPosts));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the image from file upload or fallback to default
    const imageUrl = imagePreview || formData.imageUrl || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1';
    
    if (isEditing && editingId) {
      // Update existing blog
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === editingId) {
          return {
            ...blog,
            title: formData.title,
            description: formData.description,
            location: formData.location,
            imageUrl: imageUrl,
            content: formData.content,
            featured: formData.featured,
            // Keep original date and id
          };
        }
        return blog;
      });
      
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      
      toast({
        title: "Blog updated successfully!",
        description: "Your changes have been saved.",
      });
      
      // Reset editing state
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Generate a new blog post
      const newBlog: BlogPost = {
        id: Date.now().toString(), // Ensure unique ID
        title: formData.title,
        description: formData.description,
        location: formData.location,
        imageUrl: imageUrl,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: formData.content,
        featured: formData.featured,
        tags: ['New', formData.location]
      };
      
      // Add the new blog to the list and save to localStorage
      const updatedBlogs = [newBlog, ...blogs];
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      
      toast({
        title: "Blog posted successfully!",
        description: "Your new travel story has been published.",
      });
    }
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      content: '',
      imageAlt: '',
      featured: false
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
  };
  
  const handleDelete = (id: string) => {
    // Filter out the deleted blog
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    
    // Update state and localStorage
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    
    toast({
      title: "Blog deleted",
      description: "The travel story has been removed.",
      variant: "destructive"
    });
  };
  
  const handleEdit = (blog: BlogPost) => {
    // Set editing mode
    setIsEditing(true);
    setEditingId(blog.id);
    
    // Prefill the form with blog data
    setFormData({
      title: blog.title,
      description: blog.description,
      location: blog.location,
      imageUrl: blog.imageUrl,
      content: blog.content,
      imageAlt: '',
      featured: blog.featured || false
    });
    
    // Set image preview if there's an image URL
    setImagePreview(blog.imageUrl);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleCancelEdit = () => {
    resetForm();
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-wanderlust-navy mb-8">Admin Dashboard</h1>
        
        {/* Blog Post Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-serif font-bold text-wanderlust-navy mb-4 flex items-center">
            {isEditing ? (
              <>
                <Edit size={20} className="mr-2 text-wanderlust-teal" />
                Edit Travel Story
              </>
            ) : (
              <>
                <PlusCircle size={20} className="mr-2 text-wanderlust-teal" />
                Create New Travel Story
              </>
            )}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wanderlust-teal focus:border-wanderlust-teal"
                  placeholder="The Amazing Beaches of Bali"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wanderlust-teal focus:border-wanderlust-teal"
                  placeholder="Bali, Indonesia"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wanderlust-teal focus:border-wanderlust-teal"
                placeholder="A journey through the pristine beaches and cultural wonders of Bali"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div 
                onClick={handleImageClick}
                className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-wanderlust-teal transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-1">
                Image Alt Text
              </label>
              <input
                id="imageAlt"
                name="imageAlt"
                type="text"
                value={formData.imageAlt}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wanderlust-teal focus:border-wanderlust-teal"
                placeholder="Describe the image for accessibility"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Blog Content (HTML supported)
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wanderlust-teal focus:border-wanderlust-teal"
                placeholder="<p>Your detailed travel story here...</p>"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-wanderlust-teal focus:ring-wanderlust-teal border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Feature this story on homepage
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-wanderlust-teal text-white px-6 py-2 rounded-md font-medium hover:bg-wanderlust-teal/90 transition-colors flex items-center"
              >
                {isEditing ? (
                  <>
                    <Save size={18} className="mr-2" />
                    Update Story
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} className="mr-2" />
                    Publish Story
                  </>
                )}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Blog List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-serif font-bold text-wanderlust-navy mb-4">
            Manage Travel Stories
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{blog.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{blog.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {blog.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-wanderlust-teal hover:text-wanderlust-teal/80 mr-3"
                        title="Edit blog"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete blog"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
