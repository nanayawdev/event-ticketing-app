import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  // Set all initial values to zero
  const [attendees] = useState(0)
  const [ticketPrice] = useState(0)
  const [avgOrder] = useState(0)

  // Add useEffect to handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Will show skeleton for 2 seconds

    return () => clearTimeout(timer) // Cleanup timeout on unmount
  }, [])

  // Calculate values
  const turnover = attendees * ticketPrice * avgOrder
  const commissionFee = turnover * 0 // 0% for Basic
  const youReceive = turnover - commissionFee

  return (
    <Card className="w-full max-w-3xl mx-auto opacity-50 border-0 shadow-none">
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Attendees Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-700 dark:text-gray-600 font-medium">ATTENDEES EXPECTED</Label>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-600">{attendees}</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Slider
                value={[attendees]}
                max={100}
                min={0}
                step={1}
                className="w-full cursor-not-allowed"
                disabled
              />
            )}
          </div>

          {/* Ticket Price Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-700 dark:text-gray-600 font-medium">TICKET PRICE (₵)</Label>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-600">{ticketPrice}</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Slider
                value={[ticketPrice]}
                max={200}
                min={0}
                step={10}
                className="w-full cursor-not-allowed"
                disabled
              />
            )}
          </div>

          {/* Average Order Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-700 dark:text-gray-600 font-medium">AVG. TICKET ORDER</Label>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-600">{avgOrder}</span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Slider
                value={[avgOrder]}
                max={10}
                min={0}
                step={1}
                className="w-full cursor-not-allowed"
                disabled
              />
            )}
          </div>

          {/* Calculations */}
          <div className="space-y-4 pt-6 border-t">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Turnover:</span>
                  <span className="font-medium">₵{turnover.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ticket:</span>
                  <span className="font-medium">₵{ticketPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Commission Fee (0%):</span>
                  <span className="font-medium">₵{commissionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>You Receive:</span>
                  <span className="text-gray-900 dark:text-gray-600 line-through">₵{youReceive.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}