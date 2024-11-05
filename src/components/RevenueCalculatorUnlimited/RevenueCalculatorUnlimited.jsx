import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function RevenueCalculatorUnlimited() {
  const [attendees, setAttendees] = useState(10)
  const [ticketPrice, setTicketPrice] = useState(70)
  const [avgOrder, setAvgOrder] = useState(2)

  // Calculate values
  const turnover = attendees * ticketPrice * avgOrder
  const commissionFee = turnover * 0.05 // 5% for Unlimited
  const youReceive = turnover - commissionFee

  const roundToNearestTen = (value) => Math.round(value / 10) * 10

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Revenue Calculator</h2>
      <CardContent className="p-6 space-y-8">
        {/* Attendees Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-white/70">ATTENDEES EXPECTED</Label>
            <span className="text-3xl font-bold text-[#CCFF00]">{attendees}</span>
          </div>
          <Slider
            value={[attendees]}
            onValueChange={(value) => setAttendees(value[0])}
            max={100}
            min={0}
            step={1}
            className="relative flex items-center select-none touch-none w-full"
            style={{
              '--slider-track': '#4A4A4A',
              '--slider-range': '#CCFF00',
              '--slider-thumb': '#CCFF00',
            }}
          />
        </div>

        {/* Ticket Price Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-white/70">TICKET PRICE (₵)</Label>
            <span className="text-3xl font-bold text-[#CCFF00]">{ticketPrice}</span>
          </div>
          <Slider
            value={[ticketPrice]}
            onValueChange={(value) => setTicketPrice(roundToNearestTen(value[0]))}
            max={200}
            min={0}
            step={10}
            className="relative flex items-center select-none touch-none w-full"
            style={{
              '--slider-track': '#4A4A4A',
              '--slider-range': '#CCFF00',
              '--slider-thumb': '#CCFF00',
            }}
          />
        </div>

        {/* Average Order Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-white/70">AVG. TICKET ORDER</Label>
            <span className="text-3xl font-bold text-[#CCFF00]">{avgOrder}</span>
          </div>
          <Slider
            value={[avgOrder]}
            onValueChange={(value) => setAvgOrder(value[0])}
            max={10}
            min={1}
            step={1}
            className="relative flex items-center select-none touch-none w-full"
            style={{
              '--slider-track': '#4A4A4A',
              '--slider-range': '#CCFF00',
              '--slider-thumb': '#CCFF00',
            }}
          />
        </div>

        {/* Calculations */}
        <div className="space-y-4 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Turnover:</span>
            <span className="font-medium text-white">₵{turnover.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Ticket:</span>
            <span className="font-medium text-white">₵{ticketPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Commission Fee (5%):</span>
            <span className="font-medium text-white">₵{commissionFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-white">You Receive:</span>
            <span className="text-[#CCFF00]">₵{youReceive.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </div>
  )
}
