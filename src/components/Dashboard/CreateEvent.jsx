import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox } from '@headlessui/react';
import { Plus, Trash2, ArrowRight, ArrowLeft, Upload, Image } from 'lucide-react';
import { format } from "date-fns"
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

  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const eventCategories = [
    { id: 1, name: 'Music' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Arts & Culture' },
    // ... add other categories
  ];

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

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('Event_Image', file);
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

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
          >
            <option value="">Select</option>
            {eventCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
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
                onSelect={(date) => {
                  setStartDate(date);
                  setValue('Event_Start_Date', date);
                }}
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
            setDate={(date) => {
              setStartDate(date);
              setValue('Event_Start_Time', format(date, "HH:mm"));
            }} 
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
                onSelect={(date) => {
                  setEndDate(date);
                  setValue('Event_End_Date', date);
                }}
                initialFocus
                disabled={(date) => 
                  startDate ? date < startDate : false
                }
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
            setDate={(date) => {
              setEndDate(date);
              setValue('Event_End_Time', format(date, "HH:mm"));
            }} 
          />
          {errors.Event_End_Time && (
            <p className="text-red-500 text-sm mt-1">{errors.Event_End_Time.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload Event Artwork *
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-sea-green-500 transition-colors">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="space-y-2">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setValue('Event_Image', null);
                  }}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="event-artwork"
                    className="relative cursor-pointer rounded-md font-medium text-sea-green-500 hover:text-sea-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sea-green-500"
                  >
                    <span>Upload an image</span>
                    <input
                      id="event-artwork"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                      {...register('Event_Image', { 
                        required: 'Event artwork is required',
                        validate: {
                          fileSize: (files) => 
                            !files[0] || files[0].size <= 10000000 || 'File size must be less than 10MB',
                          fileType: (files) =>
                            !files[0] || ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type) || 
                            'File must be an image (JPEG, PNG, GIF)'
                        }
                      })}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>
        {errors.Event_Image && (
          <p className="text-red-500 text-sm mt-1">{errors.Event_Image.message}</p>
        )}
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

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      tickets: useExistingTickets 
        ? selectedExistingTickets.map(id => ({
            id,
            // Add any event-specific ticket data here
          }))
        : tickets
    };

    if (isEditing) {
      console.log('Updating event:', finalData);
    } else {
      console.log('Creating event:', finalData);
    }
    onClose();
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