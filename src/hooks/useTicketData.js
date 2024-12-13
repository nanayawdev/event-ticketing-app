import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ticketService } from '../services/api';

export const useTicketData = () => {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const { data } = await ticketService.getAllTickets();
        setTicketData(data);
      } catch (err) {
        console.error('Error fetching ticket data:', err);
        toast.error('Failed to load ticket information');
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  return { ticketData, loading, error };
}; 