import React from 'react';
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
    eventId,
    eventName,
    ticketType,
    quantity,
    amount
  });

  return (
    <div className="mt-8">
      <div id="event-ticket" className="flex border-2 border-sea-green-100 rounded-lg">
        {/* QR Code Section */}
        <div className="flex-shrink-0 w-48 h-48 flex items-center justify-center p-6">
          <QRCodeSVG
            value={ticketData}
            size={160}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Separator */}
        <div className="border-l-2 border-dashed border-sea-green-100" />

        {/* Ticket Details Section */}
        <div className="flex-1 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{eventName}</h2>
          
          {/* Venue and Price Row */}
          <div className="flex justify-between items-center text-gray-700">
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
          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Start:</span>
              <span className="font-medium">
                {format(new Date(startDate), 'dd MMM yyyy')} at {startTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">End:</span>
              <span className="font-medium">
                {format(new Date(endDate), 'dd MMM yyyy')} at {endTime}
              </span>
            </div>
          </div>

          {/* Ticket Type and ID Row */}
          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Ticket:</span>
              <span className="font-medium">{ticketType} (x{quantity})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">#{eventId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleDownloadPDF}
          className="bg-sea-green-500 text-white hover:bg-sea-green-600"
        >
          <Download className="h-4 w-4 mr-2" />
          Save as PDF
        </Button>
      </div>
    </div>
  );
};

export default EventTicket; 