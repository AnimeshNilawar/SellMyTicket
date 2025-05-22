import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowToBuy() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-1 bg-cyan-300 py-10 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-10">
                    <h1 className="text-4xl font-bold mb-6 text-center">How to Buy Tickets</h1>
                    <ol className="list-decimal pl-6 space-y-4 text-gray-800">
                        <li>
                            <span className="font-semibold">Explore Events:</span> Browse or search for events and tickets listed by other users.
                        </li>
                        <li>
                            <span className="font-semibold">Find Your Ticket:</span> Click on an event to view ticket details, seat, and price information.
                        </li>
                        <li>
                            <span className="font-semibold">Enquire About a Ticket:</span> When you find a ticket you want, click the "BOOK TICKETS" or "Enquire" button. You will be asked to pay a small platform fee to proceed.
                        </li>
                        <li>
                            <span className="font-semibold">Get Seller Details:</span> After payment, the ticket owner's contact details will be provided to you.
                        </li>
                        <li>
                            <span className="font-semibold">Contact the Seller:</span> Reach out to the seller directly to arrange payment and ticket transfer. All further communication and transaction are between you and the seller.
                        </li>
                    </ol>
                    <p className="mt-8 text-gray-600 text-center">
                        For more information, see our <a href="/community-guidelines" className="text-cyan-700 underline">Community Guidelines</a> or <a href="#" className="text-cyan-700 underline">Help Center</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
