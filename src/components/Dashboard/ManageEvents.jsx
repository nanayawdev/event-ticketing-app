import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Search, Users, Ticket, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import CreateEvent from './CreateEvent';
import TicketsManagement from './TicketsManagement/TicketsManagement';
import Attendees from './Attendees';
import Modal from '@/components/ui/modal';
import EmptyState from '../EmptyState/EmptyState';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const mockEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-04-15',
      time: '09:00',
      venue: 'Tech Hub, Accra',
      status: 'Active',
      ticketsSold: 145,
      totalCapacity: 200,
      revenue: 12500.00,
      attendees: 130,
    },
    {
      id: 2,
      title: 'Music Festival',
      date: '2024-05-20',
      time: '16:00',
      venue: 'Beach Resort, Labadi',
      status: 'Draft',
      ticketsSold: 0,
      totalCapacity: 500,
      revenue: 0,
      attendees: 0,
    },
    // Add more events as needed
  ];

  const toggleEventExpand = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const handleCreateEvent = () => {
    navigate('/dashboard/create-event');
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleManageTickets = (event) => {
    setSelectedEvent(event);
    setIsTicketsModalOpen(true);
  };

  const handleViewAttendees = (event) => {
    setSelectedEvent(event);
    setIsAttendeesModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
            <p className="text-gray-600">View and manage all your events</p>
          </div>
          <button 
            onClick={handleCreateEvent}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow">
          {events.length === 0 ? (
            <EmptyState onCreateEvent={handleCreateEvent} />
          ) : (
            mockEvents.map((event) => (
              <div key={event.id} className="border-b last:border-b-0">
                {/* Event Header */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleEventExpand(event.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        event.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.date), 'MMM d, yyyy')} at {event.time} • {event.venue}
                    </p>
                  </div>
                  {expandedEventId === event.id ? <ChevronUp /> : <ChevronDown />}
                </div>

                {/* Expanded View */}
                {expandedEventId === event.id && (
                  <div className="p-4 bg-gray-50 border-t">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Ticket className="w-4 h-4" />
                          <span>Tickets Sold</span>
                        </div>
                        <p className="text-xl font-bold">{event.ticketsSold} / {event.totalCapacity}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Users className="w-4 h-4" />
                          <span>Attendees</span>
                        </div>
                        <p className="text-xl font-bold">{event.attendees}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Eye className="w-4 h-4" />
                          <span>Revenue</span>
                        </div>
                        <p className="text-xl font-bold">₵{event.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Updated Action Buttons */}
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Event
                      </button>
                      <button 
                        onClick={() => handleManageTickets(event)}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                      >
                        <Ticket className="w-4 h-4" />
                        Manage Tickets
                      </button>
                      <button 
                        onClick={() => handleViewAttendees(event)}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        <Users className="w-4 h-4" />
                        View Attendees
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <Modal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)}
          size="lg"
        >
          <CreateEvent onClose={() => setIsCreateModalOpen(false)} />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          size="lg"
        >
          <CreateEvent 
            onClose={() => setIsEditModalOpen(false)} 
            event={selectedEvent} 
            isEditing={true}
          />
        </Modal>
      )}

      {isTicketsModalOpen && (
        <Modal 
          isOpen={isTicketsModalOpen} 
          onClose={() => setIsTicketsModalOpen(false)}
          size="xl"
        >
          <TicketsManagement 
            event={selectedEvent}
            onClose={() => setIsTicketsModalOpen(false)}
          />
        </Modal>
      )}

      {isAttendeesModalOpen && (
        <Modal 
          isOpen={isAttendeesModalOpen} 
          onClose={() => setIsAttendeesModalOpen(false)}
          size="xl"
        >
          <Attendees 
            event={selectedEvent}
            onClose={() => setIsAttendeesModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageEvents;