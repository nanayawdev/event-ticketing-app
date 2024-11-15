import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import EventsGrid from './components/EventsGrid/EventsGrid';
import EventDetails from './components/EventDetails/EventDetails';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import About from './pages/About';
import Events from './components/Events/Events';
import Services from './components/Services/Services';
import Pricing from './components/Pricing/Pricing';
import Contact from './pages/Contact';
import ClientGuide from './components/ClientGuide/ClientGuide';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import Approach from './components/Approach/Approach';
import Divider from './components/Divider/Divider';
import HelpPopup from './components/HelpPopup/HelpPopup';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import EventOrganizer from "./pages/EventOrganizer";
import CookieConsentBanner from './components/CookieConsentBanner/CookieConsentBanner';
import HeroAlt from './components/HeroAlt/HeroAlt';
import NewsGrid from './components/NewsGrid/NewsGrid';
import NewsRead from './pages/NewsRead';
import { Toaster } from 'sonner';
import { PaymentProvider } from './context/PaymentContext';
import BuyTicket from './components/BuyTicket/BuyTicket';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';
import EventManagementDashboard from './pages/EventManagementDashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import { AuthProvider } from './context/AuthContext';
import SettingsLayout from './pages/settings/SettingsLayout';
import News from './pages/News';

const StandardLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <HelpPopup />
    </>
  );
};

const AppContent = () => {
  const location = useLocation();

  if (location.pathname === '/signup') return <SignUp />;
  if (location.pathname === '/login') return <Login />;

  return (
    <>
      <Routes>
        {/* Home page */}
        <Route path="/" element={
          <StandardLayout>
            <HeroAlt />
            <Brands />
            <Divider />
            <Approach />
            <EventsGrid />
            <NewsGrid />
          </StandardLayout>
        } />

        {/* Main navigation routes */}
        <Route path="/about" element={
          <StandardLayout>
            <About />
          </StandardLayout>
        } />

        <Route path="/services" element={
          <StandardLayout>
            <Services />
          </StandardLayout>
        } />

        <Route path="/pricing" element={
          <StandardLayout>
            <Pricing />
          </StandardLayout>
        } />

        <Route path="/contact" element={
          <StandardLayout>
            <Contact />
          </StandardLayout>
        } />

        <Route path="/clientguide" element={
          <StandardLayout>
            <ClientGuide />
          </StandardLayout>
        } />

        <Route path="/event-organizer" element={
          <StandardLayout>
            <EventOrganizer />
          </StandardLayout>
        } />

        {/* Event routes */}
        <Route path="/events" element={
          <StandardLayout>
            <Events />
          </StandardLayout>
        } />

        <Route path="/events/:eventName" element={
          <StandardLayout>
            <EventDetails />
          </StandardLayout>
        } />

        <Route path="/events/:eventName/buy" element={
          <StandardLayout>
            <BuyTicket />
          </StandardLayout>
        } />

        <Route path="/payment/status" element={
          <StandardLayout>
            <PaymentStatus />
          </StandardLayout>
        } />

        {/* News routes */}
        <Route path="/news" element={
          <StandardLayout>
            <News />
          </StandardLayout>
        } />

        <Route path="/news/:id" element={
          <StandardLayout>
            <NewsRead />
          </StandardLayout>
        } />

        <Route path="/dashboard" element={<EventManagementDashboard />} />
        <Route path="/privacy" element={
          <StandardLayout>
            <Privacy />
          </StandardLayout>
        } />
        <Route path="/terms" element={
          <StandardLayout>
            <Terms />
          </StandardLayout>
        } />
        <Route path="/cookies" element={
          <StandardLayout>
            <Cookies />
          </StandardLayout>
        } />
        <Route path="/settings/*" element={<SettingsLayout />} />
      </Routes>
      <CookieConsentBanner />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <AuthProvider>
          <PaymentProvider>
            <Toaster position="top-center" richColors />
            <Router>
              <AppContent />
            </Router>
          </PaymentProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;