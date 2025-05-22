import { useState, useEffect } from 'react';
import { Search, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents(); // Call with no argument, not an empty object
        fetchCities();
    }, []);

    const fetchEvents = async (filters) => {
        setLoading(true);
        try {
            let cleanFilters = {};
            if (filters) {
                cleanFilters = Object.fromEntries(Object.entries(filters).filter((entry) => entry[1]));
            }
            const data = await ticketService.getAvailableTickets(cleanFilters);
            if (!Array.isArray(data)) {
                setEvents([]);
            } else {
                setEvents(data.map(ticket => ({
                    id: ticket._id,
                    title: ticket.eventName,
                    date: new Date(ticket.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
                    time: new Date(ticket.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    venue: ticket.venue,
                    city: ticket.city,
                    price: ticket.resalePrice,
                    image: ticket.imageUrl ? ticket.imageUrl : '/api/placeholder/320/240',
                })));
            }
        } catch (err) {
            console.error('Error fetching events:', err);
            setEvents([]);
        }
        setLoading(false);
    };

    const fetchCities = async () => {
        try {
            const res = await import('../services/api');
            let cityList = await res.cityService.getCities();
            if (Array.isArray(cityList)) {
                setCities(cityList);
            } else if (cityList && Array.isArray(cityList.cities)) {
                setCities(cityList.cities);
            } else {
                setCities([]);
            }
        } catch {
            setCities([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Only include filters if they are non-empty
        const filters = {};
        if (searchQuery) filters.eventName = searchQuery;
        if (city) filters.city = city;
        if (date) filters.eventDate = date;
        fetchEvents(filters);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-1 bg-cyan-300 py-10 px-6">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">All Events</h1>
                    <form className="flex flex-wrap gap-4 mb-8 items-end" onSubmit={handleSearch}>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-gray-700 mb-1">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for events"
                                    className="w-full py-2 px-4 pr-10 rounded border border-gray-400 bg-white shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="min-w-[180px]">
                            <label className="block text-gray-700 mb-1">City</label>
                            <select
                                className="w-full py-2 px-3 rounded border border-gray-400 bg-white shadow"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            >
                                <option value="">All Cities</option>
                                {cities.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="min-w-[180px]">
                            <label className="block text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full py-2 px-3 rounded border border-gray-400 bg-white shadow"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-red-700 transition">Filter</button>
                    </form>
                    {loading ? (
                        <div className="text-center py-10 text-lg">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No events found.</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {events.map(event => (
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
                                    onClick={() => navigate(`/event/${event.id}`)}
                                    buttonLabel="VIEW DETAILS"
                                    buttonAction={() => navigate(`/event/${event.id}`)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
