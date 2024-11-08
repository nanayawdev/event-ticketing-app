import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Attendees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual API call
  const attendees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', event: 'Summer Festival', ticket: 'VIP', status: 'Checked In' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', event: 'Tech Conference', ticket: 'Regular', status: 'Registered' },
    // Add more attendees...
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendees</h2>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search attendees..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{attendee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{attendee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{attendee.event}</td>
                <td className="px-6 py-4 whitespace-nowrap">{attendee.ticket}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    attendee.status === 'Checked In' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {attendee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendees; 