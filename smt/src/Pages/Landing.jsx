import { useState, useEffect } from 'react';
import { Search, ChevronRight, Clock, MapPin, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('Today');
  const [categories, setCategories] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventsThisWeek, setEventsThisWeek] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    fetchData();
    fetchEventsThisWeek('today');
  }, []);

  const fetchData = async () => {
    try {
      // Get available tickets from the API
      const tickets = await ticketService.getAvailableTickets();

      // Categories data (this could come from API in a real app)
      const categoriesData = [
        { id: 1, name: 'MUSIC', image: '/assets/default3.png' },
        { id: 2, name: 'THEATRE', image: '/assets/theater.png' },
        { id: 3, name: 'SPORTS', image: '/assets/sports.png' },
        { id: 4, name: 'COMEDY', image: '/assets/comedy.png' },
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
        image: ticket.imageUrl ? ticket.imageUrl : '/api/placeholder/320/240',
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

  const fetchEventsThisWeek = async (tab) => {
    try {
      const events = await ticketService.getEventsByDate(tab);
      setEventsThisWeek(events);
    } catch {
      setEventsThisWeek([]);
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

  // Dynamic dates for 'Events This Week' section
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  // Find next Saturday and Sunday for the coming weekend
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + ((6 - today.getDay()) % 7));
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);

  function formatDate(date) {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-cyan-300 py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Sell <span className="text-red-600">Fast.</span> Buy <span className="text-red-600">Smart.</span>
          </h1>
          <p className="text-lg mb-8">
            Your go-to marketplace for tickets that move as fast as you do. Effortlessly list your tickets for sale or find the best deals without the wait.
          </p>
          <div className="relative mb-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for events"
                className="w-full py-3 px-4 pr-12 rounded-full border border-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

      {/* Featured Event */}
      <section className="bg-cyan-300 py-1 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-1">
            <Heart size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">FEATURED EVENT !</h2>
          </div>
          <div
            className="relative mb-2 h-96 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleEventClick('featured')}
          >
            <img
              src="/assets/default3.png"
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

      {/* Popular Events Section */}
      <section className="bg-cyan-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Clock size={20} className="mr-2" />
              <h2 className="text-xl font-semibold">POPULAR EVENTS IN TOWN !</h2>
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm"
              onClick={() => navigate('/events')}
            >
              MORE EVENTS <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {popularEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                venue={event.venue}
                city={event.city}
                price={event.price}
                image={event.image}
                onClick={() => handleEventClick(event.id)}
                buttonLabel="VIEW DETAILS"
                buttonAction={() => handleEventClick(event.id)}
              />
            ))}
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
              className={`px-6 py-3 rounded-md ${activeTab === 'Today' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
              onClick={() => { setActiveTab('Today'); fetchEventsThisWeek('today'); }}
            >
              Today
              <div className="text-xs">{formatDate(today)}</div>
            </button>
            <button
              className={`px-6 py-3 rounded-md ${activeTab === 'Tomorrow' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
              onClick={() => { setActiveTab('Tomorrow'); fetchEventsThisWeek('tomorrow'); }}
            >
              Tomorrow
              <div className="text-xs">{formatDate(tomorrow)}</div>
            </button>
            <button
              className={`px-6 py-3 rounded-md ${activeTab === 'Weekend' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
              onClick={() => { setActiveTab('Weekend'); fetchEventsThisWeek('weekend'); }}
            >
              Coming Weekend
              <div className="text-xs">{formatDate(nextSaturday)} - {formatDate(nextSunday)}</div>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {eventsThisWeek.length === 0 ? (
              <div className="text-gray-500 col-span-3">No events found for this date.</div>
            ) : (
              eventsThisWeek.map(event => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.eventName}
                  date={new Date(event.eventDate).toLocaleDateString()}
                  time={new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  venue={event.venue}
                  city={event.city}
                  price={event.resalePrice}
                  image={event.imageUrl ? (event.imageUrl.startsWith('/') ? event.imageUrl : `/${event.imageUrl}`) : '/api/placeholder/320/240'}
                  onClick={() => handleEventClick(event._id)}
                  buttonLabel="BOOK TICKETS"
                  buttonAction={() => handleEventClick(event._id)}
                />
              ))
            )}
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

      {/* Reviews Section */}
      <section className="bg-cyan-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Star size={20} className="mr-2" fill="#000" />
            <h2 className="text-xl font-semibold">REVIEWS</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-gray-800 italic">{review.text}</p>
                <div className="mt-4 font-semibold text-gray-700">{review.user?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}