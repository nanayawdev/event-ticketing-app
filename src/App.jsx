import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NoticeBar from './components/NoticeBar/NoticeBar'
import EventsGrid from './components/EventsGrid/EventsGrid';
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
import Brands from './components/Brands/Brands';
import Approach from './components/Approach/Approach';
import Divider from './components/Divider/Divider';
import Navigation from './components/Navigation/Navigation';
import HelpPopup from './components/HelpPopup/HelpPopup';
import HeroAlt from './components/HeroAlt/HeroAlt';
import OrganizerHero from './components/OrganizerHero/OrganizerHero';
// Import ThemeProvider
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
	const location = useLocation();
	const [activeCategory, setActiveCategory] = useState('All');

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
						<HeroAlt />
						<OrganizerHero />
						<Brands />
						<Divider />
						<Approach />
						<Navigation 
							activeCategory={activeCategory}
							setActiveCategory={setActiveCategory}
						/>
						<EventsGrid activeCategory={activeCategory} />
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
