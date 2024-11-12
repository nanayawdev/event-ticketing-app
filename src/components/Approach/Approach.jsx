import React from 'react';
import { Users, BadgeCent, Wallet } from 'lucide-react';

const Approach = () => {
    const stats = [
        {
            number: '12m+',
            title: 'Creators and Organisers on the platform',
            description: 'Over the years, 12m+ users have trusted our solution for their event ticketing needs.',
            bgColor: 'bg-primary-200 dark:bg-gray-700',
            icon: Users,
            iconBg: 'bg-primary-400 dark:bg-gray-600'
        },
        {
            number: '$8.9m+',
            title: "Returns made for trusting our solution.",
            description: 'Our customers have made over $8.9m+ in total revenue with our system.',
            bgColor: 'bg-primary-300 dark:bg-gray-700',
            icon: BadgeCent,
            iconBg: 'bg-primary-400 dark:bg-gray-600'
        },
        {
            number: '49m+',
            title: 'Events ticket sales and more over the years',
            description: 'Ticket sales over 49m+ transactions has been made on our platform this year.',
            bgColor: 'bg-primary-500 dark:bg-gray-700',
            icon: Wallet,
            iconBg: 'bg-primary-400 dark:bg-gray-600'
        }
    ];

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <div className="w-20 border-t-4 border-primary-600 mb-8"></div>
                    
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        We take the millions of organisers, content creators into account
                    </h2>
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div 
                                key={index} 
                                className={`relative rounded-3xl ${stat.bgColor} p-10 ${index === 0 ? 'text-white' : index === 1 || index === 2 ? 'text-white' : 'text-gray-900'}`}
                            >
                                <div className="flex flex-col gap-4">
                                    <span className="text-4xl font-bold sm:text-5xl">
                                        {stat.number}
                                    </span>
                                    <h3 className={`text-xl ${index === 2 ? 'text-gray-900' : 'text-gray-900'} font-semibold`}>
                                        {stat.title}
                                    </h3>
                                    <p className={`text-sm ${index === 1 || index === 2 ? 'text-gray-50' : 'text-gray-500'}`}>
                                        {stat.description}
                                    </p>
                                </div>
                                
                                {/* Icon in bottom right corner with background */}
                                <div className="absolute bottom-6 right-6">
                                    <div className={`${stat.iconBg} w-12 h-12 rounded-full flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${index === 0 ? 'text-primary-100' : index === 1 || index === 2 ? 'text-primary-200' : 'text-primary-900'}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Approach;