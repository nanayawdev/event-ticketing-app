import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "This product has revolutionized our workflow. It's intuitive, powerful, and an absolute joy to use daily.",
    author: "Alex Johnson",
    role: "Product Manager at TechCorp",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    content: "I've never encountered a tool so perfectly aligned with our needs. It's as if they've read our minds!",
    author: "Samantha Lee",
    role: "UX Designer at DesignHub",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    content: "The level of customer support is unparalleled. They're responsive, knowledgeable, and always go above and beyond.",
    author: "Michael Chen",
    role: "Tech Lead at InnovateCo",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

export default function ModernTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="px-8 py-12 sm:px-12">
            <div className="relative text-center">
              <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-purple-200" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor"/>
              </svg>
              
              <p className="text-gray-600 text-xl sm:text-2xl font-light leading-relaxed mb-8">"{testimonials[currentIndex].content}"</p>
              
              <div className="flex items-center justify-center">
                <img className="h-12 w-12 rounded-full object-cover" src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
                <div className="ml-4 text-left">
                  <div className="font-medium text-gray-800">{testimonials[currentIndex].author}</div>
                  <div className="text-gray-500 text-sm">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-gray-50">
            <button 
              onClick={prevTestimonial} 
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="text-sm text-gray-500">
              {currentIndex + 1} of {testimonials.length}
            </div>
            <button 
              onClick={nextTestimonial} 
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}