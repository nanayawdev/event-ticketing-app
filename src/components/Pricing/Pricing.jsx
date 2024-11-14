import React from 'react'
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import RevenueCalculatorProfessional from '../RevenueCalculatorProfessional/RevenueCalculatorProfessional'
import RevenueCalculatorUnlimited from '../RevenueCalculatorUnlimited/RevenueCalculatorUnlimited'
import RevenueCalculatorBasic from '../RevenueCalculatorBasic/RevenueCalculatorBasic'

export default function Component() {
  return (
    <>
      <div className="pt-32 px-4 py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          <div>
            <h1 className="text-4xl md:text-4xl font-bold leading-tight mb-4">
              Select the plan that fits your event needs—pay only when you earn from ticket sales
            </h1>
          </div>
          <div className="space-y-4">
            <p className="max-w-xl text-sm text-muted-foreground">
              Create and manage events of any size. Our flexible pricing plans are designed to grow with your events, 
              ensuring you have all the tools you need for successful ticket sales and event management.
            </p>
            <Button variant="default" className="p-2 h-auto bg-primary-500 dark:bg-primary-200 text-white flex items-center gap-2 hover:bg-primary-400 dark:hover:bg-primary-500 transition-colors">
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <Card className="relative bg-muted/50 rounded-3xl flex flex-col h-full md:col-span-1 shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Basic</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                A no-cost plan ideal for non-ticketed or free events, providing essential tools to promote and manage your event easily.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Event Creation & Management
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Offline/USSD Registrations
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Basic event analytics
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Capped Free Registrations
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  SMS Notifications
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">0%</span>
                    <span className="text-muted-foreground ml-1">/ ticket</span>
                  </div>
                  <Button variant="default" className="bg-black text-white hover:bg-black/90 flex items-center gap-2">
                    Start now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <RevenueCalculatorBasic />
            </CardContent>
          </Card>

          <Card className="relative bg-muted/50 rounded-3xl flex flex-col h-full shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-500 font-bold">Professional</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                An affordable plan for small to medium events, with essential ticketing features and low fees to grow your audience effortlessly.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Paid Ticketing
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  WhatsApp Ticketing
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Insurance Cover
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Limited Partner Network
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Self-served Checkpoint
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Free Plan Features
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">3%</span>
                    <span className="text-muted-foreground ml-1">/ ticket</span>
                  </div>
                  <Button variant="default" className="bg-primary-500 text-white hover:bg-primary-400 flex items-center gap-2">
                    Start now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <RevenueCalculatorProfessional />
            </CardContent>
          </Card>

          <Card className="relative bg-primary-600 text-white rounded-3xl flex flex-col h-full shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-primary-50 font-bold">Unlimited</CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  MOST POPULAR
                </Badge>
              </div>
              <p className="text-sm text-white/70 mt-2">
                A growth-focused plan with advanced ticketing options and tools, tailored to enhance both event management and attendee engagement.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Custom USSD/WhatsApp Code
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Showtime Ticketing
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Unlimited Partner Network
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Multi-User Access
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Hidden/Private Events
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-3" />
                  Essential Plan Features
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">5%</span>
                    <span className="text-white/70 ml-1">/ ticket</span>
                  </div>
                  <Button className="bg-primary-50 text-primary-600 hover:bg-primary-400 font-semibold flex items-center gap-2">
                    Start now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <RevenueCalculatorUnlimited />
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="relative bg-gradient-to-r from-primary-500/10 to-primary-500/5 dark:bg-gray-900 rounded-3xl shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-medium">Enterprise</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                    An all-inclusive plan with full ticketing features, priority support, and flexible pricing for large events needing advanced tools.
                  </p>
                </div>
                <Button variant="default" className="bg-primary-500 text-white hover:bg-primary-400 flex items-center gap-2">
                  Contact Sales
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Advanced Ticketing
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Comprehensive Promotion
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Checkpoint Support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Password Protected Events
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Cash Sales Support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-primary-500" />
                    Pro Plan Features
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}