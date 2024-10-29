import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NoticeBar from './components/NoticeBar/NoticeBar'
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import EventCardGrid from './components/EventCardGrid/EventCardGrid';
import EventDetails from './components/EventDetails/EventDetails';
import MarqueeScroll from './components/MarqueeScroll/MarqueeScroll';
import Footer from './components/Footer/Footer';
import SocialBar from './components/SocialBar/SocialBar';
import FeaturedSection from './components/FeaturedSection/FeaturedSection';
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

const AppContent = () => {
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState('');
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState('list');
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

	const generateRandomUSSD = () => {
		const prefix = '*713*';
		const middlePart = Math.floor(Math.random() * 90 + 10);
		const suffix = Math.floor(Math.random() * 900 + 100);
		return `${prefix}${middlePart}*${suffix}#`;
	};

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

	const filteredEvents = events.filter(event => 
		event.Event_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		event.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(event.Price && event.Price.toString().includes(searchQuery))
	);

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
							<UpcomingEvents 
								searchQuery={searchQuery} 
								setSearchQuery={setSearchQuery}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
							<EventCardGrid 
								events={filteredEvents}
								loading={loading}
								error={error}
							/>
							<div className="featured-section-container">
								<FeaturedSection
									title="Ghana's Largest Ticketing Network: Unrivaled Reach"
									description="Tap into our extensive network, surpassing all competitors combined. Connect with 3M+ potential attendees through our diverse ticketing partnerships."
									logos={['/path/to/expressPay.png', '/path/to/hubtel.png', '/path/to/korba.png', '/path/to/giftpal.png', '/path/to/cityloop.png', '/path/to/egotickets.png']}
								/>
								<div className="featured-divider"></div>
								<FeaturedSection
									title="Pioneering Event Insurance: Safeguarding Your Attendees"
									description="In partnership with Starlife Assurance, we're Ghana's first platform offering comprehensive insurance coverage for attendees before, during, and after events."
									coverText="Cover is underwritten by StarLife Assurance"
									logos={['/path/to/starlife.png']}
								/>
								<div className="featured-divider"></div>
								<FeaturedSection
									title="Meet Amma Aboagye: Founding curator of Wax Print Festival"
									image="/path/to/amma-video-thumbnail.jpg"
									button="Start selling today!"
								/>
							</div>
							<MarqueeScroll text="**All Your Event Needs Covered.**" />
							<SocialBar />
							<Footer />
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
		<Router>
			<AppContent />
		</Router>
	);
};

export default App;
