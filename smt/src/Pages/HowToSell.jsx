import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowToSell() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-1 bg-cyan-300 py-10 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-10">
                    <h1 className="text-4xl font-bold mb-6 text-center">How to Sell Tickets</h1>
                    <ol className="list-decimal pl-6 space-y-4 text-gray-800">
                        <li>
                            <span className="font-semibold">List Your Ticket:</span> Click "Sell Tickets" in the navigation bar and fill out the event, seat, and price details. You will pay a small platform fee to list your ticket.
                        </li>
                        <li>
                            <span className="font-semibold">Get Your Ticket Listed:</span> Once your payment is successful, your ticket will be visible to buyers on the platform.
                        </li>
                        <li>
                            <span className="font-semibold">Respond to Buyer Enquiries:</span> When a buyer is interested, they will pay a small fee to get your contact details. You will receive their enquiry and can expect them to contact you directly.
                        </li>
                        <li>
                            <span className="font-semibold">Complete the Sale:</span> Arrange payment and ticket transfer directly with the buyer. Once the ticket is sold, mark it as sold on the platform.
                        </li>
                        <li>
                            <span className="font-semibold">Done!</span> The platform's role ends after connecting you with the buyer. All further communication and transaction are between you and the buyer.
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
