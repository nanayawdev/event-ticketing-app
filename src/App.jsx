import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NoticeBar from './components/NoticeBar/NoticeBar'
import EventCardGrid from './components/EventCardGrid/EventCardGrid';
import EventDetails from './components/EventDetails/EventDetails';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import About from './components/About/About';
import Events from './components/Events/Events';
import Services from './components/Services/Services';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contacts/Contact';
import ClientGuide from './components/ClientGuide/ClientGuide';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import HeroSection from './components/HeroSection/HeroSection';
import Brands from './components/Brands/Brands';
import Approach from './components/Approach/Approach';
import Divider from './components/Divider/Divider';
import Navigation from './components/Navigation/Navigation';
import HelpPopup from './components/HelpPopup/HelpPopup';
import MyEventCard from './components/MyEventCard/MyEventCard';
// Import ThemeProvider
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
	const location = useLocation();
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			fetchEvents();
		};

		const handleOffline = () => {
			setIsOnline(false);
		};

		// Check initial online status and fetch events if online
		if (isOnline) {
			fetchEvents();
		}

		// Add event listeners for online/offline status
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		// Clean up event listeners
		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);  // Empty dependency array to run only once on mount



	const fetchEvents = async () => {
		if (!isOnline) {
			setError("You are offline. Please check your internet connection.");
			return;
		}

		try {
			setLoading(true);
			const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			
			if (Array.isArray(data)) {
				const eventsWithUSSD = data.map(event => ({
					...event,
					id: event.id ? event.id.toString() : Math.random().toString(36).substr(2, 9), // Ensure each event has a string id
					ussd: generateRandomUSSD()
				}));
				setEvents(eventsWithUSSD);
				console.log("Fetched events:", eventsWithUSSD);
			} else {
				throw new Error('Data is not in the expected format');
			}
			setLoading(false);
		} catch (error) {
			console.error('Error fetching events:', error);
			setError(`Error fetching events: ${error.message}. Please check your network connection and try again.`);
		} finally {
			setLoading(false);
		}
	};

	const isSignUpPage = location.pathname === '/signup';
	const isDashboardPage = location.pathname.startsWith('/dashboard');
	const isLoginPage = location.pathname === '/login';

	return (
		<>
			{!isSignUpPage && !isDashboardPage && !isLoginPage && <NoticeBar />}
			{!isSignUpPage && !isDashboardPage && !isLoginPage && <Navbar />}
				<Routes>
					<Route path="/" element={
						<>
							<HeroSection />
							<Brands />
							<Divider />
							<Approach />
							<Navigation />
							<MyEventCard />
							<EventCardGrid 
								events={events}
								loading={loading}
								error={error}
							/>
							<Footer />
							<HelpPopup />
						</>
					} />
					<Route path="/event/:eventName" element={<EventDetails />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
					<Route path="/about" element={<About />} />
					<Route path="/events" element={<Events />} />
					<Route path="/services" element={<Services />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/clientguide" element={<ClientGuide />} />
					<Route path="/login" element={<Login />} />
				</Routes>
		</>
	);
};

const App = () => {
	return (
		<ThemeProvider> {/* Wrap the Router with ThemeProvider */}
			<Router>
				<AppContent />
			</Router>
		</ThemeProvider>
	);
};

export default App;
