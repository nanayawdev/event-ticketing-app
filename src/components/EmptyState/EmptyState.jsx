import { Calendar } from 'lucide-react';

const EmptyState = ({ onCreateEvent }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center justify-center p-6 max-w-md text-center">
        {/* Icon Container */}
        <div className="w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        
        {/* Text Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No upcoming events
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Let's create your first event in less than 5 minutes!
        </p>
        
        {/* Create Event Button */}
        <button
          onClick={onCreateEvent}
          className="px-6 py-2.5 bg-pink-100 hover:bg-pink-200 text-pink-600 
                   rounded-lg transition-colors duration-200 font-medium"
        >
          Create event
        </button>
      </div>
    </div>
  );
};

export default EmptyState; 