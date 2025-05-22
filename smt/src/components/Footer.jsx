import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

const footerLinks = [
    {
        title: 'About Us',
        links: ['Our Story', 'Careers', 'Blog', 'Press']
    },
    {
        title: 'Contact',
        links: ['Help Center', 'Support Email', 'Live Chat', 'FAQs']
    },
    {
        title: 'Support',
        links: ['How to Buy', 'How to Sell', 'Community Guidelines', 'Safety Tips']
    }
];

export default function Footer() {
    return (
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
                                {column.links.map((link, linkIndex) => {
                                    let href = '#';
                                    if (link === 'Community Guidelines') href = '/community-guidelines';
                                    if (link === 'How to Buy') href = '/how-to-buy';
                                    if (link === 'How to Sell') href = '/how-to-sell';
                                    return (
                                        <li key={linkIndex} className="text-gray-500 text-sm">
                                            <a href={href}>{link}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-4 mt-8 border-t pt-6 justify-between">
                    <div className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} SellMyTicket. All rights reserved.</div>
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
            </div>
        </footer>
    );
}
