import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useTicketData = () => {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/ticket_table');
        if (!response.ok) throw new Error('Failed to fetch ticket data');
        const data = await response.json();
        setTicketData(data);
      } catch (err) {
        console.error('Error fetching ticket data:', err);
        toast.error('Failed to load ticket information');
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  return { ticketData, loading, error };
}; 