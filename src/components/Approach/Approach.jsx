import React from 'react';

const Approach = () => {
    const stats = [
        {
            number: '250k',
            title: 'Users on the platform',
            description: 'Vel labore deleniti veniam consequuntur sunt nobis.',
            bgColor: 'bg-gray-50'
        },
        {
            number: '$8.9 billion',
            title: "We're proud that our customers have made over $8 billion in total revenue.",
            description: 'Eu duis porta aliquam ornare. Elementum eget magna egestas.',
            bgColor: 'bg-[#14171F]'
        },
        {
            number: '401,093',
            title: 'Transactions this year',
            description: 'Eu duis porta aliquam ornare. Elementum eget magna egestas. Eu duis porta aliquam ornare.',
            bgColor: 'bg-[#4F46E5]'
        }
    ];

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <div className="w-20 border-t-4 border-black mb-8"></div>
                    
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        We approach work as a place to make the world better
                    </h2>
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`rounded-3xl ${stat.bgColor} p-10 ${index === 1 || index === 2 ? 'text-white' : 'text-gray-900'}`}
                        >
                            <div className="flex flex-col gap-4">
                                <span className="text-4xl font-bold sm:text-5xl">
                                    {stat.number}
                                </span>
                                <h3 className="text-xl font-semibold">
                                    {stat.title}
                                </h3>
                                <p className={`text-sm ${index === 1 || index === 2 ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Approach;