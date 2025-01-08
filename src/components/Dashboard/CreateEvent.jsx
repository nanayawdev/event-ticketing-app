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
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ onClose, event, isEditing = false }) => {
  const [step, setStep] = useState(1);
  const [tickets, setTickets] = useState([{ ticket_type: '', price: '', ticket_quantity: '' }]);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [eventCategories, setEventCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const navigate = useNavigate();
  const [categoryMap, setCategoryMap] = useState({});

  // Fetch event categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/event_categories');
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          
          // Create a mapping of category names to IDs
          const mapping = {};
          data.forEach(item => {
            mapping[item.Categories] = item.id;
          });
          setCategoryMap(mapping);
          
          // Extract just the Categories values for the dropdown
          const categoryValues = data.map(item => item.Categories);
          console.log('Extracted Categories:', categoryValues);
          // Define default categories if the API returns empty
          const defaultCategories = [
            'Conference',
            'Workshop',
            'Concert',
            'Exhibition',
            'Seminar',
            'Networking',
            'Festival',
            'Sports',
            'Other'
          ];
          setEventCategories(categoryValues.length > 0 ? categoryValues : defaultCategories);
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
    
    if (isBefore(startDate, addMinutes(today, 1)) && isBefore(date, currentTime)) {
      return;
    }
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    setValue('Event_Start_Time', timeString);
    console.log('Set start time:', timeString);
  };

  const handleEndTimeChange = (date) => {
    if (format(startDate, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd")) {
      const startTime = watch('Event_Start_Time');
      if (startTime) {
        const [startHour, startMinute] = startTime.split(':');
        const startDateTime = new Date(startDate);
        startDateTime.setHours(parseInt(startHour), parseInt(startMinute));
        
        if (isBefore(date, startDateTime)) {
          return;
        }
      }
    }
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    setValue('Event_End_Time', timeString);
    console.log('Set end time:', timeString);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Set the raw file object
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
      
      // Also set it in the form
      setValue('Event_Image', file);
      console.log('Image file set:', file);
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
            {eventCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
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
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm"
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
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.Event_End_Time && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_End_Time.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
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
      </div>

      <div className="space-y-2">
        {renderImageUpload()}
      </div>
    </div>
  );

  const renderStep2 = () => (
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

  const validateFormData = (formData) => {
    const requiredFields = [
      'Event_Name',
      'Event_Description',
      'Event_Start_Date',
      'Event_Start_Time',
      'Event_End_Date',
      'Event_End_Time',
      'Event_Venue',
      'event_category',
      'Username'
    ];

    for (let field of requiredFields) {
      const value = formData.get(field);
      if (!value) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!formData.image) {
        throw new Error('Please select an event image');
      }

      const userResponse = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error('User data fetch error:', errorData);
        throw new Error(`Failed to get user data: ${errorData.message || 'Please log in again'}`);
      }

      const userData = await userResponse.json();
      console.log('User data received:', userData);

      if (!userData.id) {
        throw new Error('User ID not found in response');
      }

      const formDataToSend = new FormData();

      // Get the time values
      const startTimeValue = watch('Event_Start_Time');
      const endTimeValue = watch('Event_End_Time');

      if (!startTimeValue || !endTimeValue) {
        throw new Error('Please select both start and end times');
      }

      // Parse the time values
      const [startHour, startMinute] = startTimeValue.split(':');
      const [endHour, endMinute] = endTimeValue.split(':');

      // Create start date with time
      const startDateTime = new Date(startDate);
      startDateTime.setHours(
        parseInt(startHour),
        parseInt(startMinute),
        0,
        0
      );

      // Create end date with time
      const endDateTime = new Date(endDate);
      endDateTime.setHours(
        parseInt(endHour),
        parseInt(endMinute),
        0,
        0
      );

      // Convert to Unix timestamps (seconds)
      const startTimestamp = Math.floor(startDateTime.getTime() / 1000);
      const endTimestamp = Math.floor(endDateTime.getTime() / 1000);

      // Debug logging
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('Start Time:', startTimeValue);
      console.log('End Time:', endTimeValue);
      console.log('Final Start DateTime:', startDateTime.toLocaleString());
      console.log('Final End DateTime:', endDateTime.toLocaleString());

      // Add fields to FormData
      formDataToSend.append('Event_Name', data.Event_Name.trim());
      formDataToSend.append('Event_Description', data.Event_Description.trim());
      formDataToSend.append('Event_Start_Date', format(startDateTime, "yyyy-MM-dd"));
      formDataToSend.append('Event_Start_Time', startTimestamp.toString());
      formDataToSend.append('Event_End_Date', format(endDateTime, "yyyy-MM-dd"));
      formDataToSend.append('Event_End_Time', endTimestamp.toString());
      formDataToSend.append('Event_Venue', data.Event_Venue.trim());
      formDataToSend.append('event_category', categoryMap[data.Event_Category].toString());
      formDataToSend.append('Username', userData.id.trim());
      formDataToSend.append('imagefile', formData.image);

      // Log the final data being sent
      console.log('Form Data Values:');
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      validateFormData(formDataToSend);
      
      const eventResponse = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/ticket_event_table', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formDataToSend
      });
      
      // Log the complete response
      const responseText = await eventResponse.text();
      console.log('Raw response:', responseText);
      
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
        console.log('Parsed response:', parsedResponse);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!eventResponse.ok) {
        throw new Error(parsedResponse.message || 'Failed to create event');
      }

      if (parsedResponse.id) {
        setStep(2);
        localStorage.setItem('currentEventId', parsedResponse.id);
        alert('Event created successfully! Now you can add tickets.');
      } else {
        throw new Error('No event ID received from server');
      }

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

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          
          {step < 2 ? (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-2 px-4 py-2 bg-sea-green-500 text-white rounded-md hover:bg-sea-green-600 ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-sea-green-500 text-white rounded-md hover:bg-sea-green-600 ml-auto"
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