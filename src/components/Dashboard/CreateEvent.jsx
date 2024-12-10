import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox } from '@headlessui/react';
import { Plus, Trash2, ArrowRight, ArrowLeft, Upload, Image } from 'lucide-react';
import { format, isBefore, startOfToday, addMinutes } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TimePicker from "@/components/ui/time-picker"
import { useTicketManagement } from '@/hooks/useTicketManagement';

const CreateEvent = ({ onClose, event, isEditing = false }) => {
  const [step, setStep] = useState(1);
  const [tickets, setTickets] = useState([{ ticket_type: '', price: '', ticket_quantity: '' }]);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [eventCategories, setEventCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch event categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:4S2X7JDM/event_category');
        if (response.ok) {
          const data = await response.json();
          setEventCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const today = startOfToday();

  // Prevent selecting past dates
  const handleStartDateChange = (date) => {
    if (isBefore(date, today)) {
      return;
    }
    setStartDate(date);
    setValue('Event_Start_Date', date);
    
    // Only update end date if it's before the new start date
    if (isBefore(endDate, date)) {
      setEndDate(date);
      setValue('Event_End_Date', date);
    }
  };

  const handleEndDateChange = (date) => {
    // Allow same day selection but prevent selecting days before start date
    if (isBefore(date, startDate)) {
      return;
    }
    setEndDate(date);
    setValue('Event_End_Date', date);
  };

  // Get current time rounded to nearest 30 minutes
  const getCurrentRoundedTime = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    return addMinutes(now, roundedMinutes - minutes);
  };

  // Prevent selecting past times
  const handleStartTimeChange = (date) => {
    const currentTime = getCurrentRoundedTime();
    
    // If it's today, prevent selecting past times
    if (isBefore(startDate, addMinutes(today, 1)) && isBefore(date, currentTime)) {
      return;
    }
    
    setStartDate(date);
    setValue('Event_Start_Time', format(date, "HH:mm"));
    
    // If end time is before start time on the same day, update it
    if (format(startDate, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd") && 
        isBefore(endDate, date)) {
      const newEndDate = addMinutes(date, 30); // Set end time 30 minutes after start time
      setEndDate(newEndDate);
      setValue('Event_End_Time', format(newEndDate, "HH:mm"));
    }
  };

  const handleEndTimeChange = (date) => {
    // If same day, ensure end time is after start time
    if (format(startDate, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd") && 
        isBefore(date, startDate)) {
      return;
    }
    
    setEndDate(date);
    setValue('Event_End_Time', format(date, "HH:mm"));
  };

  const addTicket = () => {
    setTickets([...tickets, { ticket_type: '', price: '', ticket_quantity: '' }]);
  };

  const removeTicket = (index) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = tickets.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    setTickets(newTickets);
  };

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
  });
  
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    console.log('handleImageChange triggered');
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      console.log('File type:', file.type);
      console.log('File size:', file.size);

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
      
      setValue('Event_Image', file);
    }
  };

  const renderImageUpload = () => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Event Artwork *
      </label>
      <div 
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
      >
        <div className="space-y-1 text-center">
          {formData.imagePreview ? (
            <div className="relative group">
              <img
                src={formData.imagePreview}
                alt="Event artwork preview"
                className="mx-auto h-64 w-auto rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({
                      ...prev,
                      image: null,
                      imagePreview: null
                    }));
                    setValue('Event_Image', null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      </div>
      {errors.Event_Image && (
        <p className="text-red-500 text-sm mt-1">{errors.Event_Image.message}</p>
      )}
    </div>
  );

  React.useEffect(() => {
    if (isEditing && event) {
      setValue('Event_Name', event.title);
      setValue('Event_Venue', event.venue);
      // ... set other form values based on event data
      setStartDate(new Date(event.date));
      // ... set other state values
    }
  }, [event, isEditing, setValue]);

  const [useExistingTickets, setUseExistingTickets] = useState(false);
  const { tickets: existingTickets } = useTicketManagement();
  const [selectedExistingTickets, setSelectedExistingTickets] = useState([]);

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Event Information</h2>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Name *
          </label>
          <input
            {...register('Event_Name', { required: 'Event name is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Event_Name && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_Name.message}</p>
          )}
        </div>

        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Category *
          </label>
          <select
            {...register('Event_Category', { required: 'Category is required' })}
            className="w-full px-4 py-2 border rounded-md"
            disabled={isLoadingCategories}
          >
            <option value="">Select</option>
            {eventCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.Event_Category}
              </option>
            ))}
          </select>
          {errors.Event_Category && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_Category.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Description *
        </label>
        <textarea
          {...register('Event_Description', { 
            required: 'Event description is required',
            minLength: {
              value: 50,
              message: 'Description must be at least 50 characters'
            },
            maxLength: {
              value: 1000,
              message: 'Description must not exceed 1000 characters'
            }
          })}
          rows={6}
          className="w-full px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your event..."
        />
        {errors.Event_Description && (
          <p className="text-red-500 text-sm mt-1">{errors.Event_Description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Start Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                disabled={(date) => isBefore(date, today)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.Event_Start_Date && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_Start_Date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Start Time *
          </label>
          <TimePicker 
            date={startDate} 
            setDate={handleStartTimeChange}
            minTime={isBefore(startDate, today) ? getCurrentRoundedTime() : undefined}
          />
          {errors.Event_Start_Time && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_Start_Time.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event End Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                disabled={(date) => isBefore(date, startDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.Event_End_Date && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_End_Date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event End Time *
          </label>
          <TimePicker 
            date={endDate} 
            setDate={handleEndTimeChange}
            minTime={startDate}
          />
          {errors.Event_End_Time && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_End_Time.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {renderImageUpload()}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Venue and Organizer Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Venue *
          </label>
          <input
            {...register('Event_Venue', { required: 'Venue is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Event_Venue && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_Venue.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            {...register('Address', { required: 'Address is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Address && (
            <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Locality *
          </label>
          <input
            {...register('Locality', { required: 'Locality is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Locality && (
            <p className="text-red-500 text-sm mt-1">{errors.Locality.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <input
            {...register('Country', { required: 'Country is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Country && (
            <p className="text-red-500 text-sm mt-1">{errors.Country.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organizer Name *
          </label>
          <input
            {...register('Organizer_Name', { required: 'Organizer name is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Organizer_Name && (
            <p className="text-red-500 text-sm mt-1">{errors.Organizer_Name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('Phone_Number', { required: 'Phone number is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Phone_Number && (
            <p className="text-red-500 text-sm mt-1">{errors.Phone_Number.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            {...register('Email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Organizer Logo
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('Organizer_Logo')}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Event Tickets</h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setUseExistingTickets(!useExistingTickets)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            {useExistingTickets ? 'Create New Tickets' : 'Use Existing Tickets'}
          </button>
          {!useExistingTickets && (
            <button
              type="button"
              onClick={addTicket}
              className="flex items-center gap-2 px-4 py-2 bg-sea-green-500 text-white rounded-md hover:bg-sea-green-600"
            >
              <Plus className="w-4 h-4" />
              Add Ticket Type
            </button>
          )}
        </div>
      </div>

      {useExistingTickets ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Select from existing tickets:</p>
          <div className="grid grid-cols-1 gap-4">
            {existingTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedExistingTickets.includes(ticket.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedExistingTickets([...selectedExistingTickets, ticket.id]);
                      } else {
                        setSelectedExistingTickets(
                          selectedExistingTickets.filter(id => id !== ticket.id)
                        );
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <div>
                    <h3 className="font-medium">{ticket.name}</h3>
                    <p className="text-sm text-gray-500">
                      GH₵{ticket.price.toFixed(2)} - {ticket.quantity} available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        tickets.map((ticket, index) => (
          <div key={index} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Ticket #{index + 1}</h3>
              {tickets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicket(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Type *
                </label>
                <input
                  value={ticket.ticket_type}
                  onChange={(e) => handleTicketChange(index, 'ticket_type', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Price (GH₵) *
                </label>
                <input
                  type="number"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Quantity *
                </label>
                <input
                  type="number"
                  value={ticket.ticket_quantity}
                  onChange={(e) => handleTicketChange(index, 'ticket_quantity', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // First append the image if it exists
      if (formData.image) {
        formData.append('Event_Image', formData.image, formData.image.name);
      }

      // Then append all other form fields
      Object.keys(data).forEach(key => {
        if (key !== 'Event_Image') { // Skip Event_Image as we handled it above
          formData.append(key, data[key]);
        }
      });

      // Add other required fields
      formData.append('Event_Start_Time', format(startDate, "HH:mm"));
      formData.append('Event_End_Time', format(endDate, "HH:mm"));
      formData.append('Event_Start_Date', format(startDate, "yyyy-MM-dd"));
      formData.append('Event_End_Date', format(endDate, "yyyy-MM-dd"));
      formData.append('tickets', JSON.stringify(tickets));

      // Log the FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch('https://api-server.krontiva.africa/api:4S2X7JDM/events', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);

      onClose?.();
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.message || 'Failed to create event. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2 bg-sea-green-500 text-white rounded-md hover:bg-sea-green-600 ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-sea-green-500 text-white rounded-md hover:bg-sea-green-600 ml-auto"
            >
              Create Event
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;  