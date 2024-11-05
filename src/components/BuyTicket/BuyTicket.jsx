import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
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
  Package, 
  Truck, 
  Calendar,
  Minus,
  Plus 
} from 'lucide-react'
import { useState } from 'react';

const BuyTicket = ({ event }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [tickets, setTickets] = useState([
    {
      date: event.Event_Start_Date,
      title: "Regular Day Pass",
      price: event.Event_Price || 200.00,
      quantity: 0
    },
    {
      date: event.Event_Start_Date,
      title: "Regular Festival Pass",
      price: (event.Event_Price || 200.00) * 1.5,
      quantity: 0
    },
    {
      date: event.Event_Start_Date,
      title: "VIP Day Pass",
      price: (event.Event_Price || 200.00) * 2,
      quantity: 0
    }
  ])

  const handleDecrease = (index) => {
    setTickets(tickets.map((ticket, i) => {
      if (i === index && ticket.quantity > 0) {
        return { ...ticket, quantity: ticket.quantity - 1 }
      }
      return ticket
    }))
  }

  const handleIncrease = (index) => {
    setTickets(tickets.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, quantity: ticket.quantity + 1 }
      }
      return ticket
    }))
  }
  
  const images = [
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg',
    event.Event_Image?.url || '/assets/images/herobg.jpg'
  ]

  // Calculate order summary
  const subtotal = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  const momoCharges = subtotal * 0.01; // Changed to 1% MOMO charges
  const total = subtotal + momoCharges;

  // Helper function to format category names
  const formatCategory = (category) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

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
            <div className="flex flex-wrap gap-2 mb-2">
              {Array.isArray(event.Event_Category) ? (
                event.Event_Category.map((category, index) => (
                  <Badge key={index} variant="outline">
                    {formatCategory(category)}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">
                  {formatCategory(event.Event_Category || 'Uncategorized')}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{event.Event_Name}</h1>
            <p className="text-2xl font-bold mt-2">GH₵ {event.Event_Price?.toFixed(2) || '0.00'}</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description" className="border-b-0">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold">Description & Details</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line">
                {event.Event_Description || 'No description available.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border-t border-b-0">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold">Shipping</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-sea-green-50 p-2 rounded-lg">
                      <Percent className="h-5 w-5 text-sea-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Discount</p>
                      <p className="text-muted-foreground">Disc 50%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-sea-green-50 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-sea-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Package</p>
                      <p className="text-muted-foreground">Regular Package</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-sea-green-50 p-2 rounded-lg">
                      <Truck className="h-5 w-5 text-sea-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Delivery Time</p>
                      <p className="text-muted-foreground">3-4 Working Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-sea-green-50 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-sea-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Estimation Arrive</p>
                      <p className="text-muted-foreground">10 - 12 October 2024</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-sea-green-500">
                Ticket Currency | GH₵
              </h3>
            </div>
            <div className="space-y-0">
              {tickets.map((ticket, index) => (
                <div key={index}>
                  <div className="py-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{ticket.date}</p>
                      <h3 className="font-medium">{ticket.title}</h3>
                      <p className="font-semibold">GH₵ {ticket.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDecrease(index)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={ticket.quantity}
                        className="h-8 w-16 text-center"
                        min="0"
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleIncrease(index)}
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
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            
            {/* Selected Tickets */}
            <div className="space-y-4 mb-6">
              {tickets.filter(ticket => ticket.quantity > 0).map((ticket, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{ticket.title} x {ticket.quantity}</span>
                  <span>GH₵ {(ticket.price * ticket.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-4" />

            {/* Subtotal and MOMO Charges */}
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

            {/* Divider */}
            <div className="h-px bg-gray-200 my-4" />

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>GH₵ {total.toFixed(2)}</span>
            </div>

            <Button 
              className="w-full h-12 text-base mt-6" 
              size="lg"
              disabled={!tickets.some(ticket => ticket.quantity > 0)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyTicket