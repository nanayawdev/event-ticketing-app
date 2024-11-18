import React, { useState } from 'react';
import { Ticket, Edit, Trash2, Plus } from 'lucide-react';
import { useTicketManagement } from '@/hooks/useTicketManagement';
import TicketStats from './TicketStats';
import TicketForm from './TicketForm';
import Modal from '@/components/ui/modal';
import { toast } from 'react-hot-toast';

const TicketsManagement = ({ event, onClose }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  
  const {
    tickets,
    loading,
    error,
    stats,
    addTicket,
    updateTicket,
    deleteTicket
  } = useTicketManagement(event?.id);

  const handleSubmit = async (data) => {
    try {
      if (selectedTicket) {
        await updateTicket(selectedTicket.id, data);
        toast.success('Ticket updated successfully');
      } else {
        await addTicket(data);
        toast.success('Ticket created successfully');
      }
      setIsFormOpen(false);
      setSelectedTicket(null);
    } catch (err) {
      toast.error('Failed to save ticket');
    }
  };

  const handleDelete = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      toast.success('Ticket deleted successfully');
      setIsDeleteModalOpen(false);
      setTicketToDelete(null);
    } catch (err) {
      toast.error('Failed to delete ticket');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tickets Management</h2>
        <button
          onClick={() => {
            setSelectedTicket(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create New Ticket
        </button>
      </div>

      <TicketStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Ticket className="w-8 h-8 text-blue-500" />
              <div className="space-x-2">
                <button 
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsFormOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setTicketToDelete(ticket);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{ticket.name}</h3>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              GH₵{ticket.price.toFixed(2)}
            </p>
            
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

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTicket(null);
        }}
      >
        <TicketForm
          onSubmit={handleSubmit}
          initialData={selectedTicket}
          mode={selectedTicket ? 'edit' : 'create'}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTicket(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTicketToDelete(null);
        }}
      >
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">
            Delete Ticket
          </h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </p>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setTicketToDelete(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDelete(ticketToDelete.id)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TicketsManagement; 