import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"

export default function RevenueCalculatorUnlimited() {
  const [isLoading, setIsLoading] = useState(true)
  const [attendees, setAttendees] = useState(10)
  const [ticketPrice, setTicketPrice] = useState(70)
  const [avgOrder, setAvgOrder] = useState(2)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate values
  const turnover = attendees * ticketPrice * avgOrder
  const commissionFee = turnover * 0.05
  const youReceive = turnover - commissionFee

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Revenue Calculator</h2>
      <CardContent className="p-6 space-y-8">
        {/* Attendees Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-gray-50 dark:text-primary-100 font-medium">ATTENDEES EXPECTED</Label>
            {isLoading ? (
              <Skeleton className="h-8 w-20 bg-gray-700" />
            ) : (
              <span className="text-3xl font-bold text-primary-50 dark:text-primary-100">{attendees}</span>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-2 w-full bg-gray-700" />
          ) : (
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
          )}
        </div>

        {/* Ticket Price Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-gray-50 dark:text-primary-100 font-medium">TICKET PRICE (₵)</Label>
            {isLoading ? (
              <Skeleton className="h-8 w-20 bg-gray-700" />
            ) : (
              <span className="text-3xl font-bold text-primary-50 dark:text-primary-100">{ticketPrice}</span>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-2 w-full bg-gray-700" />
          ) : (
            <Slider
              value={[ticketPrice]}
              onValueChange={(value) => setTicketPrice(value[0])}
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
          )}
        </div>

        {/* Average Order Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-white/70">AVG. TICKET ORDER</Label>
            {isLoading ? (
              <Skeleton className="h-8 w-20 bg-gray-700" />
            ) : (
              <span className="text-3xl font-bold text-primary-50 dark:text-primary-100">{avgOrder}</span>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-2 w-full bg-gray-700" />
          ) : (
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
          )}
        </div>

        {/* Calculations */}
        <div className="space-y-4 pt-6 border-t border-gray-700">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-8 w-full bg-gray-700" />
            </>
          ) : (
            <>
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
                <span className="text-primary-50 dark:text-primary-100">₵{youReceive.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </div>
  )
}
