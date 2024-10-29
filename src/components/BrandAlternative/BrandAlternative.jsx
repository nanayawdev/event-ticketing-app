import React from 'react';

const BrandAlternative = () => {
    const brands = [
        {
            name: 'Transistor',
            logo: '/path-to-transistor-logo.svg'
        },
        {
            name: 'Reform',
            logo: '/path-to-reform-logo.svg'
        },
        {
            name: 'Tuple',
            logo: '/path-to-tuple-logo.svg'
        },
        {
            name: 'SavvyCal',
            logo: '/path-to-savvycal-logo.svg'
        },
        {
            name: 'Statamic',
            logo: '/path-to-statamic-logo.svg'
        }
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14171F] via-[#14171F] to-[#2D1F54]"></div>
            
            {/* Content */}
            <div className="relative px-6 py-24 sm:px-8 md:py-32">
                <div className="mx-auto max-w-7xl">
                    {/* Text content */}
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Our customers love us
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
                            Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi adipisicing officia excepteur tempor deserunt.
                        </p>
                    </div>

                    {/* Brand logos */}
                    <div className="mx-auto mt-20">
                        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                            {brands.map((brand, index) => (
                                <div 
                                    key={index} 
                                    className="flex justify-center"
                                >
                                    <img
                                        className="h-12 w-auto object-contain"
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandAlternative; 