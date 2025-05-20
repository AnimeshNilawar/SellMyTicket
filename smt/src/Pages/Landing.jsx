import { useState, useEffect } from 'react';
import { Search, ChevronRight, Clock, MapPin, Heart, Star, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ticketService, cityService } from '../services/api';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('Today');
  const [categories, setCategories] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Get available tickets from the API
      const tickets = await ticketService.getAvailableTickets();
      
      // Get cities for filters
      const citiesData = await cityService.getCities();
      setCities(citiesData);
      
      // Categories data (this could come from API in a real app)
      const categoriesData = [
        { id: 1, name: 'MUSIC', image: '/api/placeholder/320/240' },
        { id: 2, name: 'THEATRE', image: '/api/placeholder/320/240' },
        { id: 3, name: 'SPORTS', image: '/api/placeholder/320/240' },
        { id: 4, name: 'COMEDY', image: '/api/placeholder/320/240' },
      ];
      setCategories(categoriesData);
      
      // Transform ticket data for display
      const eventsData = tickets.map(ticket => ({
        id: ticket._id,
        title: ticket.eventName,
        date: new Date(ticket.eventDate).toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric'
        }).toUpperCase(),
        time: new Date(ticket.eventDate).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        venue: ticket.venue,
        city: ticket.city,
        price: ticket.resalePrice,
        image: '/api/placeholder/320/240', // Use ticket.imageUrl if available
      }));
      setPopularEvents(eventsData);
      
      // Reviews data (could be from an API in a real app)
      const reviewsData = [
        {
          id: 1,
          text: '"Seamless experience! Bought last-minute concert tickets without any hassle. The prices were fair, and the checkout was super quick. Definitely my go-to for events!"',
          user: {
            name: 'Anita R.',
            description: 'Bangalore',
            avatar: '/api/placeholder/40/40',
          },
        },
        {
          id: 2,
          text: '"Great for both buying and selling! I sold my football tickets in under an hour and got paid instantly. The app\'s interface is clean and easy to navigate. Highly recommend!"',
          user: {
            name: 'Mark L.',
            description: 'Chandigarh',
            avatar: '/api/placeholder/40/40',
          },
        },
        {
          id: 3,
          text: '"Good but needs improvement. The app works well, but I\'d love to see more filters for ticket types. Overall, a decent experience."',
          user: {
            name: 'Priya S.',
            description: 'Bengaluru',
            avatar: '/api/placeholder/40/40',
          },
        },
      ];
      setReviews(reviewsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleEventClick = (eventId) => {
    // In a real application, navigate to the event detail page
    navigate(`/event/${eventId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-cyan-300">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const footerLinks = [
    {
      title: 'About Us',
      links: ['Page', 'Page', 'Page', 'Page']
    },
    {
      title: 'Contact',
      links: ['Page', 'Page', 'Page', 'Page']
    },
    {
      title: 'Support',
      links: ['Page', 'Page', 'Page', 'Page']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header/Navigation */}
      <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="text-2xl font-bold">
          <span>SellMy</span>
          <span className="text-red-600">Ticket</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 text-sm font-medium">Buy Tickets</button>
          <button className="text-gray-700 text-sm font-medium">Sell Tickets</button>
          <button className="text-gray-700 text-sm font-medium">Cart</button>
          <button className="bg-black text-white px-4 py-1 rounded text-sm font-medium">
            LOGIN / SIGN-UP
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cyan-300 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Sell <span className="text-red-600">Fast.</span> Buy <span className="text-red-600">Smart.</span>
          </h1>
          <p className="text-lg mb-8">
            Your go-to marketplace for tickets that move as fast as you do. Effortlessly list your tickets for sale or find the best deals without the wait.
          </p>
          <div className="relative mb-10">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for events"
                className="w-full py-3 px-4 pr-12 rounded-full shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-cyan-300 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="flex text-xl font-semibold">
              <span className="mr-2">CATEGORIES</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3 text-center font-bold">{category.name}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm">
              NEXT <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gray-100 py-10 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">GOT ANY EXTRA EVENT TICKETS?</h2>
        <button 
          className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium"
          onClick={() => navigate('/sell-tickets')}
        >
          LIST YOUR TICKET NOW!
        </button>
      </section>

      {/* Popular Events Section */}
      <section className="bg-cyan-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Clock size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">POPULAR EVENTS IN TOWN !</h2>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {popularEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleEventClick(event.id)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{event.date} | {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                  <button className="bg-red-600 text-white text-sm w-full py-1 rounded">
                    BOOK TICKETS
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button 
              className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm"
              onClick={() => navigate('/events')}
            >
              MORE EVENTS <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Events This Week */}
      <section className="bg-cyan-300 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Clock size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">EVENTS THIS WEEK !</h2>
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-6 py-3 rounded-md ${
                activeTab === 'Today' ? 'bg-red-600 text-white' : 'bg-white text-red-600'
              }`}
              onClick={() => setActiveTab('Today')}
            >
              Today
              <div className="text-xs">18th March</div>
            </button>
            <button
              className={`px-6 py-3 rounded-md ${
                activeTab === 'Tomorrow' ? 'bg-red-600 text-white' : 'bg-white text-red-600'
              }`}
              onClick={() => setActiveTab('Tomorrow')}
            >
              Tomorrow
              <div className="text-xs">19th March</div>
            </button>
            <button
              className={`px-6 py-3 rounded-md ${
                activeTab === 'Weekend' ? 'bg-red-600 text-white' : 'bg-white text-red-600'
              }`}
              onClick={() => setActiveTab('Weekend')}
            >
              Coming Weekend
              <div className="text-xs">23rd-24th March</div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="bg-cyan-300 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Heart size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">FEATURED EVENT !</h2>
          </div>
          <div 
            className="relative mb-4 h-96 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleEventClick('featured')}
          >
            <img
              src="/api/placeholder/1200/600"
              alt="Coldplay Concert"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-4xl font-bold text-white mb-4 italic">
                Coldplay
                <br />
                In Concert
              </h2>
              <button className="bg-white text-black px-6 py-2 rounded-md w-max">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-cyan-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Star size={20} className="mr-2" fill="#000" />
            <h2 className="text-xl font-semibold">REVIEWS</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4 text-gray-700">{review.text}</p>
                <div className="flex items-center">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{review.user.name}</h4>
                    <p className="text-sm text-gray-500">{review.user.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex mb-8">
            <div className="w-1/4">
              <div className="text-xl font-bold mb-6">
                <span>SellMy</span>
                <span className="text-red-600">Ticket</span>
              </div>
            </div>
            {footerLinks.map((column, index) => (
              <div key={index} className="w-1/4">
                <h3 className="font-medium mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-gray-500 text-sm">
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-600">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-gray-600">
              <Youtube size={18} />
            </a>
            <a href="#" className="text-gray-600">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}