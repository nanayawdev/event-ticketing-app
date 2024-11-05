import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function RevenueCalculatorProfessional() {
  const [attendees, setAttendees] = useState(10)
  const [ticketPrice, setTicketPrice] = useState(70)
  const [avgOrder, setAvgOrder] = useState(2)

  // Calculate values
  const turnover = attendees * ticketPrice * avgOrder
  const commissionFee = turnover * 0.03 // 3% for Professional
  const youReceive = turnover - commissionFee

  const roundToNearestTen = (value) => Math.round(value / 10) * 10

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Revenue Calculator</h2>
      <CardContent className="p-6 space-y-8">
        {/* Attendees Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">ATTENDEES EXPECTED</Label>
            <span className="text-3xl font-bold text-sea-green-500">{attendees}</span>
          </div>
          <Slider
            value={[attendees]}
            onValueChange={(value) => setAttendees(value[0])}
            max={100}
            min={0}
            step={1}
          />
        </div>

        {/* Ticket Price Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">TICKET PRICE (₵)</Label>
            <span className="text-3xl font-bold text-sea-green-500">{ticketPrice}</span>
          </div>
          <Slider
            value={[ticketPrice]}
            onValueChange={(value) => setTicketPrice(roundToNearestTen(value[0]))}
            max={200}
            min={0}
            step={10}
          />
        </div>

        {/* Average Order Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">AVG. TICKET ORDER</Label>
            <span className="text-3xl font-bold text-sea-green-500">{avgOrder}</span>
          </div>
          <Slider
            value={[avgOrder]}
            onValueChange={(value) => setAvgOrder(value[0])}
            max={10}
            min={1}
            step={1}
          />
        </div>

        {/* Calculations */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Turnover:</span>
            <span className="font-medium">₵{turnover.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Ticket:</span>
            <span className="font-medium">₵{ticketPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Commission Fee (3%):</span>
            <span className="font-medium">₵{commissionFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>You Receive:</span>
            <span className="text-sea-green-500">₵{youReceive.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </div>
  )
}
