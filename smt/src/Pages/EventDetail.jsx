import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ticketService } from '../services/api';

function EventDetail() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', error: false });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await ticketService.getTicketById(id);
        setEventDetails(data);
      } catch {
        setError('Could not load event details.');
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  if (!eventDetails) return null;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      {/* Event Details Section */}
      <section className="bg-cyan-300 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-row gap-8">
          {/* Event Description */}
          <div className="w-1/2">
            <h1 className="text-5xl font-black mb-6">EVENT DESCRIPTION</h1>
            <h2 className="text-xl mb-4 font-bold">{eventDetails.eventName}</h2>
            <div className="mb-6">
              <span className="font-semibold">Type:</span> {eventDetails.ticketType} <br />
              <span className="font-semibold">Seat:</span> {eventDetails.seatNumber} <br />
              <span className="font-semibold">Status:</span> {eventDetails.status}
            </div>
            <div className="space-y-1 mb-4">
              <p className="font-bold">Date: {new Date(eventDetails.eventDate).toLocaleDateString()}</p>
              <p className="font-bold">Venue: {eventDetails.venue}</p>
              <p className="font-bold">City: {eventDetails.city}</p>
              <p className="font-bold">Original Price: ₹{eventDetails.originalPrice}</p>
              <p className="font-bold">Resale Price: ₹{eventDetails.resalePrice}</p>
            </div>
            <button
              type="button"
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-base font-medium transition-transform duration-200 hover:scale-105 hover:bg-red-700 shadow-md hover:shadow-xl"
              onClick={async () => {
                try {
                  const res = await ticketService.enquireTicket(id);
                  if (res && res.message && res.message.includes('already enquired')) {
                    setPopup({ show: true, message: 'Owner details already sent to your registered mobile no and email.', error: false });
                  } else {
                    setPopup({ show: true, message: 'Owner Details has been send to your registered mobile no and email', error: false });
                  }
                } catch {
                  setPopup({ show: true, message: 'Failed to get owner details. Please try again.', error: true });
                }
              }}
            >
              Get Owner Details
            </button>
            {popup.show && (
              <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40`}>
                <div className={`bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center ${popup.error ? 'text-red-600' : 'text-green-700'}`}>
                  <p className="mb-4">{popup.message}</p>
                  <button className="mt-2 px-4 py-2 bg-black text-white rounded" onClick={() => setPopup({ ...popup, show: false })}>OK</button>
                </div>
              </div>
            )}
          </div>

          {/* Event Image */}
          <div className="w-1/2 flex items-center justify-center">
            {eventDetails.imageUrl ? (
              <img
                src={eventDetails.imageUrl.startsWith('/') ? eventDetails.imageUrl : `/${eventDetails.imageUrl}`}
                alt={eventDetails.eventName}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg text-gray-500">
                No Image Available
              </div>
            )}
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
            {/* Similar events data - this should ideally come from an API as well */}
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`/api/placeholder/400/300`}
                  alt={`Similar Event ${id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Similar Event {id}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">Date Time</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">Venue, City</span>
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
      <Footer />
    </div>
  );
}

export default EventDetail;