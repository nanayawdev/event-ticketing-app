import { useState, useEffect } from 'react';

const dummyTickets = [
  { id: 1, name: 'VIP Pass', price: 199.99, quantity: 100, sold: 45 },
  { id: 2, name: 'Regular Entry', price: 49.99, quantity: 500, sold: 123 },
  { id: 3, name: 'Early Bird', price: 29.99, quantity: 200, sold: 180 },
];

export const useTicketManagement = (eventId) => {
  const [tickets, setTickets] = useState(dummyTickets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateStats = () => ({
    totalRevenue: tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.sold), 0),
    totalSold: tickets.reduce((sum, ticket) => sum + ticket.sold, 0),
    remainingCapacity: tickets.reduce((sum, ticket) => sum + (ticket.quantity - ticket.sold), 0)
  });

  const addTicket = (ticketData) => {
    const newTicket = {
      id: tickets.length + 1,
      ...ticketData,
      sold: 0
    };
    setTickets([...tickets, newTicket]);
    return Promise.resolve(newTicket);
  };

  const updateTicket = (ticketId, updates) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
    return Promise.resolve({ id: ticketId, ...updates });
  };

  const deleteTicket = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    return Promise.resolve();
  };

  return {
    tickets,
    loading,
    error,
    stats: calculateStats(),
    addTicket,
    updateTicket,
    deleteTicket
  };
}; 