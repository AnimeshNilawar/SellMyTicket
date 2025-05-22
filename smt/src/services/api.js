import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log headers for debugging
        console.log('API Request:', config.method?.toUpperCase(), config.url, 'Headers:', config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);

// Ticket related API calls
export const ticketService = {
    // Get all available tickets with optional filters
    getAvailableTickets: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (filters.eventName) queryParams.append('eventName', filters.eventName);
            if (filters.city) queryParams.append('city', filters.city);
            if (filters.eventDate) queryParams.append('eventDate', filters.eventDate);

            const response = await api.get(`/tickets?${queryParams}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    },

    // Get single ticket details
    getTicketById: async (id) => {
        try {
            const response = await api.get(`/tickets/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            throw error;
        }
    },

    // Create a new ticket listing
    createTicket: async (ticketData) => {
        try {
            const response = await api.post('/tickets', ticketData);
            return response.data;
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    },

    // Enquire about a ticket (simulates payment/inquiry process)
    enquireTicket: async (ticketId) => {
        try {
            const response = await api.post(`/tickets/${ticketId}/enquire`);
            return response.data;
        } catch (error) {
            console.error('Error enquiring about ticket:', error);
            throw error;
        }
    },

    // Get seller contact info (after enquiry)
    getSellerContact: async (ticketId) => {
        try {
            const response = await api.get(`/tickets/${ticketId}/contact`);
            return response.data;
        } catch (error) {
            console.error('Error getting seller contact:', error);
            throw error;
        }
    },

    // Mark ticket as sold
    markTicketSold: async (ticketId) => {
        try {
            const response = await api.patch(`/tickets/${ticketId}/sold`);
            return response.data;
        } catch (error) {
            console.error('Error marking ticket as sold:', error);
            throw error;
        }
    },

    // Get tickets listed by the current user
    getUserTickets: async () => {
        try {
            const response = await api.get('/users/me/listed-tickets');
            return response.data;
        } catch (error) {
            console.error('Error fetching user tickets:', error);
            throw error;
        }
    },

    // Get tickets enquired by the current user
    getUserEnquiredTickets: async () => {
        try {
            const response = await api.get('/users/me/enquired-tickets');
            return response.data;
        } catch (error) {
            console.error('Error fetching enquired tickets:', error);
            throw error;
        }
    },

    // Get events by date filter (today, tomorrow, weekend)
    getEventsByDate: async (dateType) => {
        try {
            const response = await api.get(`/tickets/date/${dateType}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events by date:', error);
            throw error;
        }
    }
};

// Auth related API calls
export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('token_timestamp', Date.now().toString());
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('token_timestamp', Date.now().toString());
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_timestamp');
    },

    // Get current user profile (updated to use /users/me)
    getProfile: async () => {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }
};

// City related API calls
export const cityService = {
    getCities: async () => {
        try {
            const response = await api.get('/cities');
            return response.data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    }
};

export default api;