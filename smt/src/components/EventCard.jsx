import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function EventCard({
    id,
    title,
    date,
    time,
    venue,
    image,
    onClick,
    buttonLabel = 'View Details',
    buttonAction,
    city,
    price
}) {
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onClick}
        >
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{date} | {time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{venue}{city ? `, ${city}` : ''}</span>
                </div>
                {price && (
                    <div className="text-sm text-gray-800 mb-2">₹{price}</div>
                )}
                <button
                    className="bg-red-600 text-white text-sm w-full py-1 rounded"
                    onClick={e => {
                        e.stopPropagation();
                        buttonAction && buttonAction(id);
                    }}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}
