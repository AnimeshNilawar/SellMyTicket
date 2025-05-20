import React from 'react';
import { Clock, MapPin, ChevronRight, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

function EventDetail() {
  // In a real application, you would fetch this data from an API
  // based on an event ID from URL parameters or props
  const eventDetails = {
    title: 'Live in Concert: [Artist/Band Name] - The [Tour Name] Tour!',
    description: 'Get ready for an unforgettable night of music, energy, and electrifying performances as [Artist/Band Name] takes the stage at [Venue Name] on [Date]! Feel the thrill as they perform chart-topping hits and fan favorites, complete with stunning visuals and heart-pounding sound. From soulful ballads to high-octane anthems, this is the concert experience you\'ve been waiting for. Grab your tickets now and be part of a night that will leave you singing long after the encore ends!',
    date: '[Date]',
    venue: '[Venue Name]',
    time: '[Start Time]',
    image: '/api/placeholder/800/600',
    ticketsAvailable: true,
  };

  // Similar events data
  const similarEvents = [
    {
      id: 1,
      title: 'Vishal Shekhar Live In Concert',
      date: 'MAY 15',
      time: '7:00 PM',
      venue: 'Yash Lawns, Pune',
      image: '/api/placeholder/400/300',
    },
    {
      id: 2,
      title: 'Arijit Singh Live In Concert',
      date: 'APRIL 1',
      time: '8:00 PM',
      venue: 'FC Social, Pune',
      image: '/api/placeholder/400/300',
    },
    {
      id: 3,
      title: 'Diljit Dosanjh Tour',
      date: 'MAY 15',
      time: '7:00 PM',
      venue: 'Yash Lawns, Pune',
      image: '/api/placeholder/400/300',
    },
  ];

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

      {/* Event Details Section */}
      <section className="bg-cyan-300 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-row gap-8">
          {/* Event Description */}
          <div className="w-1/2">
            <h1 className="text-5xl font-black mb-6">EVENT DESCRIPTION</h1>
            <h2 className="text-xl mb-4 font-bold">{eventDetails.title}</h2>
            <p className="mb-6">{eventDetails.description}</p>
            <div className="space-y-1 mb-4">
              <p className="font-bold">Date: {eventDetails.date}</p>
              <p className="font-bold">Venue: {eventDetails.venue}</p>
              <p className="font-bold">Time: {eventDetails.time}</p>
              <p className="font-bold">Tickets: {eventDetails.ticketsAvailable ? 'Available now!' : 'Sold out'}</p>
            </div>
          </div>
          
          {/* Event Image */}
          <div className="w-1/2">
            <img 
              src={eventDetails.image} 
              alt={eventDetails.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Similar Events Section */}
      <section className="bg-cyan-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Clock size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">SIMILAR EVENTS</h2>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {similarEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{event.date} {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                  <button className="bg-red-600 text-white text-sm w-full py-1 rounded">
                    View Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm">
              MORE EVENTS <ChevronRight size={16} className="ml-1" />
            </button>
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

export default EventDetail;