import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

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
    );
}
