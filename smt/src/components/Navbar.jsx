import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

    useEffect(() => {
        const syncLoginState = () => setIsLoggedIn(!!localStorage.getItem('token'));
        window.addEventListener('storage', syncLoginState);
        return () => window.removeEventListener('storage', syncLoginState);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
            <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                <span>SellMy</span>
                <span className="text-red-600">Ticket</span>
            </div>
            <div className="flex items-center space-x-6">
                <button className="text-gray-700 text-sm font-medium" onClick={() => navigate('/events')}>Explore Tickets</button>
                <button className="text-gray-700 text-sm font-medium" onClick={() => navigate('/sell-tickets')}>Sell Tickets</button>
                {isLoggedIn ? (
                    <>
                        <button className="text-gray-700 text-sm font-medium" onClick={() => navigate('/profile')}>
                            My Profile
                        </button>
                        <button className="bg-black text-white px-4 py-1 rounded text-sm font-medium" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <button className="bg-black text-white px-4 py-1 rounded text-sm font-medium" onClick={() => navigate('/login')}>
                        LOGIN / SIGN-UP
                    </button>
                )}
            </div>
        </header>
    );
}
