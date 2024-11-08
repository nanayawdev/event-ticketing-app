"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TimePicker = ({ date, setDate }) => {
  const minuteItems = Array.from({ length: 60 }, (_, i) => i)
  const hourItems = Array.from({ length: 24 }, (_, i) => i)

  const handleHourChange = (hour) => {
    const newDate = new Date(date)
    newDate.setHours(parseInt(hour))
    setDate(newDate)
  }

  const handleMinuteChange = (minute) => {
    const newDate = new Date(date)
    newDate.setMinutes(parseInt(minute))
    setDate(newDate)
  }

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1.5">
        <Select
          defaultValue={date?.getHours()}
          onValueChange={handleHourChange}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent position="popper">
            {hourItems.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Select
          defaultValue={date?.getMinutes()}
          onValueChange={handleMinuteChange}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent position="popper">
            {minuteItems.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TimePicker 