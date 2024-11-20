import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import EventsGrid from './components/EventsGrid/EventsGrid';
import EventDetails from './components/EventDetails/EventDetails';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Events from './components/Events/Events';
import Services from './pages/Services';
import Pricing from './components/Pricing/Pricing';
import Contact from './pages/Contact';
import ClientGuide from './components/ClientGuide/ClientGuide';
import SignIn from './pages/SignIn';
import HelpPopup from './components/HelpPopup/HelpPopup';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import EventOrganizer from "./pages/EventOrganizer";
import CookieConsentBanner from './components/CookieConsentBanner/CookieConsentBanner';
import NewHero from './components/NewHero/NewHero';
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
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SocialButton from './components/SocialButton/SocialButton';
import ApiTest from './components/ApiTest';
import { NotificationsProvider } from './context/NotificationsContext';
import Onboarding from './components/Onboarding/Onboarding';

const StandardLayout = ({ children, showHelp = false }) => {
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      {showHelp && <HelpPopup />}
    </>
  );
};

const AppContent = () => {
  const location = useLocation();

  if (location.pathname === '/signup') return <SignUp />;
  if (location.pathname === '/login') return <SignIn />;

  return (
    <>
      <ApiTest />
      <Routes>
        {/* Home page */}
        <Route path="/" element={
          <StandardLayout showHelp={true}>
            <HeroAlt />
            <NewHero />
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
      <CookieConsentBanner />
    </>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ThemeProvider>
      <PaymentProvider>
        <NotificationsProvider>
          <ErrorBoundary>
            <AuthProvider>
              <Router>
                <AppContent />
              </Router>
            </AuthProvider>
          </ErrorBoundary>
        </NotificationsProvider>
      </PaymentProvider>
    </ThemeProvider>
  );
};

export default App;