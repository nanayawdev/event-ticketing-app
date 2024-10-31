import React, { useState } from 'react';
import { format, isFuture, isPast, isToday, differenceInDays } from 'date-fns';
import { ThumbsUp } from 'lucide-react';
import stonebwoy from "../../assets/images/stonebwoy.jpeg";
const NewEventCard = ({ 
  title = "Logitech BX3 Mouse",
  venue = "Kumasi Mall",
  date = "2024-11-08",
  price = 456,
  imageUrl = stonebwoy,
  initialLikes = 204
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const getEventStatus = (eventDate) => {
    const dateObj = new Date(eventDate);
    
    if (isToday(dateObj)) {
      return {
        text: "Event Due Today",
        className: "bg-green-500"
      };
    } else if (isPast(dateObj)) {
      return {
        text: "Past Event",
        className: "bg-red-500"
      };
    } else if (isFuture(dateObj)) {
      const daysUntil = differenceInDays(dateObj, new Date());
      if (daysUntil <= 0) {
        return {
          text: "Currently Live",
          className: "bg-pink-500"
        };
      }
      return {
        text: `${daysUntil} days until event`,
        className: "bg-slate-800"
      };
    }
  };

  const status = getEventStatus(date);

  return (
    <div className="w-[300px] h-[250px] rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative h-[150px]">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-2 left-2 ${status.className} text-white px-2 py-1 rounded-full text-xs`}>
          {status.text}
        </span>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-bold truncate">{title}</h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              className="focus:outline-none"
            >
              <ThumbsUp 
                className={`w-4 h-4 ${hasLiked ? 'fill-current text-blue-500' : 'text-gray-400'}`}
              />
            </button>
            {likes > 0 && (
              <span className="text-xs text-gray-500">{likes}</span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 truncate">{venue}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-blue-500">{format(new Date(date), 'MMM d')}</span>
            <span className="text-sm text-gray-300 font-thin">|</span>
            <span className="text-sm text-blue-500">${price}</span>
          </div>
          
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-1">
            <span className="text-xs">View Event</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEventCard;
