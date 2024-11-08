import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  Percent, 
  Truck, 
  Calendar,
  Minus,
  Plus,
  MapPin,
  ExternalLink
} from 'lucide-react'
import { useState, useEffect } from 'react';
import { isFuture, isPast, isToday, isTomorrow, differenceInDays, format } from 'date-fns'
import { usePayment } from '../../context/PaymentContext';
import { PaystackButton } from 'react-paystack';
import { toast } from 'sonner';
import CurrencySelector from '../CurrencySelector/CurrencySelector';

const BuyTicket = ({ event }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [email, setEmail] = useState('');
  const { selectedCurrency, convertCurrency } = usePayment();

  // Create array with main image and placeholders for thumbnails
  const images = [
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg'
  ]

  // Initialize tickets state without the date field
  const [tickets, setTickets] = useState(
    event.Ticket_Price?.length > 0
      ? event.Ticket_Price.map(ticket => ({
          title: ticket.ticket_type,
          price: Number(ticket.price),
          quantity: 0,
          available: Number(ticket.ticket_quantity)
        }))
      : [{
          title: "Regular Ticket",
          price: Number(event.Event_Price) || 0,
          quantity: 0,
          available: 100
        }]
  );

  useEffect(() => {
    // Update tickets when event changes
    if (event.Ticket_Price?.length > 0) {
      setTickets(
        event.Ticket_Price.map(ticket => ({
          title: ticket.ticket_type,
          price: Number(ticket.price),
          quantity: 0,
          available: Number(ticket.ticket_quantity)
        }))
      );
    }
  }, [event]);

  // Rest of your existing code remains the same
  const handleDecrease = (index) => {
    setTickets(prevTickets => 
      prevTickets.map((ticket, i) => {
        if (i === index && ticket.quantity > 0) {
          return { ...ticket, quantity: ticket.quantity - 1 };
        }
        return ticket;
      })
    );
  };

  const handleIncrease = (index) => {
    setTickets(prevTickets => 
      prevTickets.map((ticket, i) => {
        if (i === index && ticket.quantity < ticket.available) {
          return { ...ticket, quantity: ticket.quantity + 1 };
        }
        return ticket;
      })
    );
  };

  // Calculate order summary based on current ticket quantities
  const subtotal = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  const momoCharges = subtotal * 0.01; // 1% MOMO charges
  const total = subtotal + momoCharges;

  // Update componentProps to use the new total
  const componentProps = {
    email,
    amount: total * 100, // Convert to pesewas
    publicKey: 'your-paystack-public-key',
    text: "Pay Now",
    onSuccess: () => {
      toast.success("Payment successful!");
      // Reset ticket quantities after successful payment
      setTickets(prevTickets => 
        prevTickets.map(ticket => ({ ...ticket, quantity: 0 }))
      );
    },
    onClose: () => {
      toast.error("Payment cancelled");
    },
    metadata: {
      eventId: event.id,
      eventName: event.Event_Name,
      tickets: tickets.filter(t => t.quantity > 0).map(t => ({
        type: t.title,
        quantity: t.quantity
      }))
    },
  };

  const getEventStatus = () => {
    const now = new Date()
    const startDateTime = new Date(event.Event_Start_Time)
    const endDateTime = new Date(event.Event_End_Time)

    if (now > endDateTime) {
      return { text: "Event Closed", className: "bg-red-500" }
    }

    // Check if event is ongoing and calculate time until end
    if (now >= startDateTime && now <= endDateTime) {
      const hoursUntilEnd = (endDateTime - now) / (1000 * 60 * 60)
      
      if (hoursUntilEnd <= 3) {
        if (hoursUntilEnd <= 1) {
          const minutesLeft = Math.floor(hoursUntilEnd * 60)
          return { text: `Event ending in ${minutesLeft}m`, className: "bg-orange-500" }
        }
        const hours = Math.floor(hoursUntilEnd)
        const minutes = Math.floor((hoursUntilEnd - hours) * 60)
        return { text: `Event ending in ${hours}h ${minutes}m`, className: "bg-orange-500" }
      }
      return { text: `Happening now at ${event.Event_Venue}`, className: "bg-green-500" }
    }

    // Calculate time difference in hours until start
    const hoursUntil = (startDateTime - now) / (1000 * 60 * 60)
    
    // If less than 24 hours away
    if (hoursUntil <= 24 && hoursUntil > 0) {
      const hours = Math.floor(hoursUntil)
      const minutes = Math.floor((hoursUntil - hours) * 60)
      if (hours > 0) {
        return { text: `${hours}h ${minutes}m until event`, className: "bg-yellow-500" }
      }
      return { text: `${minutes}m until event`, className: "bg-yellow-500" }
    }

    if (isTomorrow(startDateTime)) {
      return { text: "Tomorrow", className: "bg-blue-500" }
    }

    if (isFuture(startDateTime)) {
      const daysUntil = differenceInDays(startDateTime, now)
      if (daysUntil <= 7) {
        return { text: `${daysUntil} days until event`, className: "bg-yellow-500" }
      }
      return { text: `${daysUntil} days away`, className: "bg-gray-500" }
    }

    return { text: "Check dates", className: "bg-gray-400" }
  }

  const status = getEventStatus()

  return (
    <div className="container max-w-[1600px] mx-auto px-4 py-8">
      <div className="grid gap-16 lg:grid-cols-3">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg bg-muted">
            <img
              src={event.Event_Image?.url || '/assets/images/herobg.jpg'}
              alt={event.Event_Name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "overflow-hidden rounded-lg bg-muted",
                  selectedImage === index && "ring-2 ring-primary"
                )}
              >
                <img
                  src={image}
                  alt={`${event.Event_Name} thumbnail ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <Badge 
              className={cn(
                "mb-2 text-white",
                status.className
              )}
            >
              {status.text}
            </Badge>
            <h1 className="text-3xl font-bold">{event.Event_Name}</h1>
            <p className="text-2xl font-bold mt-2">GH₵ {event.Event_Price?.toFixed(2) || '0.00'}</p>
          </div>
          
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description" className="border-b-0">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold">Description & Details</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {event.Event_Description || 'No description available.'}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm pt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-sea-green-50 p-2.5 rounded-xl">
                        <div className="bg-sea-green-100 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-sea-green-500" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Venue</p>
                        <p className="text-muted-foreground">{event.Event_Venue || 'TBA'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-sea-green-50 p-2.5 rounded-xl">
                        <div className="bg-sea-green-100 p-2 rounded-lg">
                          <Calendar className="h-5 w-5 text-sea-green-500" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Event Date</p>
                        <p className="text-muted-foreground">
                          {format(new Date(event.Event_Start_Date), 'dd MMM yyyy')}
                          {event.Event_Start_Date !== event.Event_End_Date && (
                            <> - {format(new Date(event.Event_End_Date), 'dd MMM yyyy')}</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-sea-gray-500">
                Ticket Purchase Information
              </h3>
            </div>
            <div className="space-y-0">
              {tickets.map((ticket, index) => (
                <div key={index}>
                  <div className="py-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{ticket.title}</h3>
                      <p className="font-semibold">GH₵ {ticket.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.available - ticket.quantity} tickets remaining
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white text-black hover:bg-gray-100"
                        onClick={() => handleDecrease(index)}
                        disabled={ticket.quantity === 0}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={ticket.quantity}
                        className="h-8 w-16 text-center"
                        min="0"
                        max={ticket.available}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white text-black hover:bg-gray-100"
                        onClick={() => handleIncrease(index)}
                        disabled={ticket.quantity >= ticket.available}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {index < tickets.length - 1 && (
                    <div className="h-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {tickets.filter(ticket => ticket.quantity > 0).map((ticket, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{ticket.title} x {ticket.quantity}</span>
                  <span>GH₵ {(ticket.price * ticket.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>GH₵ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">MOMO Charges (1%)</span>
                <span>GH₵ {momoCharges.toFixed(2)}</span>
              </div>
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>GH₵ {total.toFixed(2)}</span>
            </div>

            <PaystackButton 
              {...componentProps}
              className="w-full bg-sea-green-500 text-white py-2 px-4 rounded hover:bg-sea-green-600"
            />
          </div>

          {/* Advertisement Component */}
        </div>
      </div>
    </div>
  )
}

export default BuyTicket