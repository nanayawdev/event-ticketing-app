import React from 'react';
import heroBg from '../../assets/images/ska.jpg';

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

    const handleDiscoverClick = () => {
        const navigationSection = document.querySelector('.navigation-section');
        if (navigationSection) {
            const navHeight = 80; // Approximate height of the navigation bar
            const elementPosition = navigationSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
            style={{ 
                backgroundImage: `linear-gradient(rgba(15, 31, 23, 0.7), rgba(0, 0, 0, 5)), url(${heroBg})`
            }}
        >
            <div className="mx-auto max-w-9xl px-4 pt-64 sm:px-6 md:pt-80 lg:px-32 lg:pt-96">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-bold leading-tight text-sea-green-200 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        Discover Your Next Adventure.
                    </h1>
                    <p className="max-w-3xl mt-4 text-sm text-sea-green-200 sm:text-base md:text-lg">
                    Explore a variety of events—from live music and sports to cultural festivals and conferences—all in one place, for memories that last a lifetime.
                    </p>
                    
                    <div className="mt-8 flex flex-row items-center gap-6">
                        <button 
                            onClick={handleDiscoverClick}
                            className="rounded-lg bg-sea-green-600 px-6 py-3 font-semibold text-sea-green-50 transition-colors hover:bg-sea-green-400 sm:px-8 sm:py-4"
                        >
                            DISCOVER EVENTS
                        </button>
                        <a href="#" className="font-medium text-sea-green-50 underline hover:text-sea-green-200">
                            Hosting an event?
                        </a>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-8 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={`flex flex-col py-6 
                                ${index % 2 !== 0 ? 'pl-8 border-l border-sea-green-50' : ''} 
                                ${index % 4 !== 0 ? 'lg:pl-8 lg:border-l lg:border-sea-green-50' : ''}
                                first:pl-0`}>
                                <h2 className="text-3xl font-bold text-sea-green-50 sm:text-3xl md:text-4xl">
                                    {stat.number}
                                </h2>
                                <p className="mt-2 text-xs text-sea-green-50 sm:text-sm">
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
