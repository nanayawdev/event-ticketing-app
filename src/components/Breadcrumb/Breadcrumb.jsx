import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routeNameMap = {
  '': 'Home',
  'events': 'Events',
  'dashboard': 'Dashboard',
  'profile': 'Profile',
  'tickets': 'My Tickets',
  'settings': 'Settings',
  'organizer': 'Organizer',
  // Add more route mappings as needed
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getDisplayName = (pathname) => {
    // First check the mapping
    if (routeNameMap[pathname.toLowerCase()]) {
      return routeNameMap[pathname.toLowerCase()];
    }
    // If no mapping exists, format the pathname
    return pathname
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="mb-3 sm:mb-6">
      <div className="flex items-center text-gray-600 text-[10px] xs:text-xs sm:text-sm">
        <Link 
          to="/" 
          className="hover:text-primary-500 transition-colors font-medium"
        >
          {routeNameMap['']}
        </Link>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = getDisplayName(name);
          
          return (
            <div key={name} className="flex items-center">
              <ChevronRight className="mx-0.5 xs:mx-1 sm:mx-2 h-2.5 xs:h-3 sm:h-4 w-2.5 xs:w-3 sm:w-4 text-gray-400" />
              {isLast ? (
                <span className="text-primary-500 font-medium">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-primary-500 transition-colors font-medium"
                >
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb; 