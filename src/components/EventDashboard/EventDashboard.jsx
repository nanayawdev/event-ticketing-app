"use client"

import { useState } from "react"
import { Bell, ChevronDown, Layout, Calendar, Users, BarChart, Ticket, Settings, User, Search, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview")

  const tabs = [
    { name: "Overview", icon: Layout },
    { name: "Create Events", icon: PlusCircle },
    { name: "Manage Events", icon: Calendar },
    { name: "Attendees", icon: Users },
    { name: "Analytics", icon: BarChart },
    { name: "Tickets", icon: Ticket },
    { name: "Settings", icon: Settings },
    { name: "Profile", icon: User },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">EventMaster</h1>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center px-6 py-3 text-gray-700 w-full ${
                activeTab === tab.name ? "bg-blue-100 border-r-4 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 mr-4"
            />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{activeTab}</h2>
          {/* Placeholder content for each tab */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Total Events</h3>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Total Tickets Sold</h3>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold">$12,345</p>
              </div>
            </div>
          )}
          {activeTab === "Create Events" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Create a New Event</h3>
              <form className="space-y-4">
                <Input placeholder="Event Name" />
                <Input type="date" />
                <Input placeholder="Location" />
                <Button>Create Event</Button>
              </form>
            </div>
          )}
          {/* Add placeholder content for other tabs as needed */}
        </main>
      </div>
    </div>
  )
}
