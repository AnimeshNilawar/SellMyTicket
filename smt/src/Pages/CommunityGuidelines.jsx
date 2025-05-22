import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CommunityGuidelines() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-1 bg-cyan-300 py-10 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-10">
                    <h1 className="text-4xl font-bold mb-6 text-center">Community Guidelines</h1>
                    <p className="mb-6 text-lg text-gray-700 text-center">
                        Welcome to SellMyTicket! To keep our marketplace safe, fair, and enjoyable for everyone, please follow these guidelines when buying, selling, or interacting on our platform.
                    </p>
                    <ul className="list-disc pl-6 space-y-4 text-gray-800">
                        <li>
                            <span className="font-semibold">Be Honest:</span> Only list tickets you own and provide accurate event, seat, and price details.
                        </li>
                        <li>
                            <span className="font-semibold">No Scalping or Fraud:</span> Do not use bots, fake accounts, or attempt to resell tickets above legal limits.
                        </li>
                        <li>
                            <span className="font-semibold">Respect Privacy:</span> Seller contact details will be shared only after a valid enquiry. Do not misuse or publicly share any personal information you receive.
                        </li>
                        <li>
                            <span className="font-semibold">Be Respectful:</span> Treat all users with courtesy. Harassment, hate speech, or abuse will not be tolerated.
                        </li>
                        <li>
                            <span className="font-semibold">Report Issues:</span> If you encounter suspicious activity or inappropriate behavior, report it to our support team immediately.
                        </li>
                        <li>
                            <span className="font-semibold">Follow the Law:</span> Comply with all local laws and event organizer rules regarding ticket resale.
                        </li>
                    </ul>
                    <p className="mt-8 text-gray-600 text-center">
                        Thank you for helping us build a trusted ticket marketplace. Happy buying and selling!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
