import React, { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';

const EventTicket = ({ 
  eventName, 
  venue, 
  startDate, 
  startTime, 
  endDate, 
  endTime, 
  ticketType, 
  quantity,
  amount,
  eventId 
}) => {
  // Move ticketId generation into useMemo
  const ticketId = useMemo(() => {
    const initials = eventName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${initials}${randomNum}`;
  }, [eventName]); // Only regenerate if eventName changes

  // Format ticket types display
  const formatTicketTypes = () => {
    if (!ticketType || !Array.isArray(ticketType)) {
      return 'Regular Ticket';
    }
    
    return ticketType
      .filter(ticket => ticket.quantity > 0)
      .map(ticket => `${ticket.title} (x${ticket.quantity})`)
      .join(', ');
  };

  const handleDownloadPDF = () => {
    const ticket = document.getElementById('event-ticket');
    const opt = {
      margin: 1,
      filename: `${eventName}-ticket.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(ticket).save();
  };

  const ticketData = JSON.stringify({
    eventId: ticketId,
    eventName,
    ticketType,
    quantity,
    amount
  });

  // Format time function using the same logic as useEvents
  const formatDateTime = (date, time) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    const formattedDate = format(dateObj, 'dd MMM yyyy');
    
    let formattedTime = '';
    if (time) {
      try {
        // Handle timestamp
        if (typeof time === 'number') {
          formattedTime = format(new Date(time), 'HH:mm');
        } 
        // Handle time string
        else if (typeof time === 'string') {
          const [hours, minutes] = time.split(':');
          formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        }
      } catch (error) {
        console.error('Error formatting time:', error);
        formattedTime = time; // Fallback to original value
      }
    }

    return `${formattedDate}${formattedTime ? ` at ${formattedTime}` : ''}`;
  };

  return (
    <div className="mt-8">
      <div 
        id="event-ticket" 
        className="flex flex-col sm:flex-row border-2 border-sea-green-100 rounded-lg"
      >
        {/* QR Code Section */}
        <div className="w-full sm:w-48 h-48 flex items-center justify-center p-6 border-b-2 sm:border-b-0 border-dashed border-sea-green-100">
          <QRCodeSVG
            value={ticketData}
            size={160}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Separator - Only show on sm and above */}
        <div className="hidden sm:block border-l-2 border-dashed border-sea-green-100" />

        {/* Ticket Details Section */}
        <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{eventName}</h2>
          
          {/* Venue and Price Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Venue:</span>
              <span className="font-medium">{venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">GH₵ {amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Dates Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Start:</span>
              <span className="font-medium">
                {formatDateTime(startDate, startTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">End:</span>
              <span className="font-medium">
                {formatDateTime(endDate, endTime)}
              </span>
            </div>
          </div>

          {/* Ticket Type and ID Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Ticket:</span>
              <span className="font-medium break-words">{formatTicketTypes()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">#{ticketId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center sm:justify-end mt-4">
        <Button
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto bg-sea-green-500 text-white hover:bg-sea-green-600"
        >
          <Download className="h-4 w-4 mr-2" />
          Save as PDF
        </Button>
      </div>
    </div>
  );
};

export default EventTicket;