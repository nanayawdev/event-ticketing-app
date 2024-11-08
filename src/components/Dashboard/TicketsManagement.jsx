import React, { useState } from 'react';
import { Ticket, Edit, Trash2 } from 'lucide-react';

const TicketsManagement = () => {
  const [tickets, setTickets] = useState([
    { id: 1, name: 'VIP Pass', price: 199.99, quantity: 100, sold: 45 },
    { id: 2, name: 'Regular Entry', price: 49.99, quantity: 500, sold: 123 },
    // Add more ticket types...
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tickets Management</h2>
      
      <div className="mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create New Ticket Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Ticket className="w-8 h-8 text-blue-500" />
              <div className="space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{ticket.name}</h3>
            <p className="text-2xl font-bold text-gray-800 mb-4">${ticket.price}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="font-medium">{ticket.quantity - ticket.sold}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sold</span>
                <span className="font-medium">{ticket.sold}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-medium">{ticket.quantity}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(ticket.sold / ticket.quantity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsManagement; 