import React from 'react';
import heroBg from '../../assets/images/amakyedede.jpeg';

const HeroSection = () => {
    const stats = [
        {
            number: '42,000',
            text: 'Events hosted since 2013 by event creators like you'
        },
        {
            number: '4,000',
            text: 'Creators trust us to deliver seamless experiences'
        },
        {
            number: '$2m',
            text: 'Paid out to event creators in the last 24 months'
        },
        {
            number: '10yrs',
            text: 'Experience in ticketing and event management'
        }
    ];

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
            style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBg})`
            }}
        >
            <div className="mx-auto max-w-9xl px-4 pt-64 sm:px-6 md:pt-80 lg:px-32 lg:pt-96">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        Find, book, and enjoy events you love.
                    </h1>
                    <p className="max-w-3xl mt-4 text-sm text-gray-300 sm:text-base md:text-lg">
                        Africa's most trusted event ticketing partner since 2013. Powering seamless experiences for thousands of event creators, online and offline.
                    </p>
                    
                    <div className="mt-8 flex flex-row items-center gap-6">
                        <button className="rounded bg-[#FF4B26] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e63e1a] sm:px-8 sm:py-4">
                            DISCOVER EVENTS
                        </button>
                        <a href="#" className="font-medium text-white underline hover:text-gray-300">
                            Hosting an event?
                        </a>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-8 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={`flex flex-col py-6 
                                ${index % 2 !== 0 ? 'pl-8 border-l border-gray-600' : ''} 
                                ${index % 4 !== 0 ? 'lg:pl-8 lg:border-l lg:border-gray-600' : ''}
                                first:pl-0`}>
                                <h2 className="text-3xl font-bold text-[#FF4B26] sm:text-3xl md:text-4xl">
                                    {stat.number}
                                </h2>
                                <p className="mt-2 text-xs text-gray-300 sm:text-sm">
                                    {stat.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
