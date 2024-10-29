import React from 'react';
import Transistor from '../../assets/icons/discord.svg';
import Reform from '../../assets/icons/github.png';
import Tuple from '../../assets/icons/apple.png';
import SavvyCal from '../../assets/icons/cc-visa.png';
import Statamic from '../../assets/icons/card.png';

const BrandAlternative = () => {
    const brands = [
        {
            name: 'Transistor',
            logo: Transistor
        },
        {
            name: 'Reform',
            logo: Reform
        },
        {
            name: 'Tuple',
            logo: Tuple
        },
        {
            name: 'SavvyCal',
            logo: SavvyCal
        },
        {
            name: 'Statamic',
            logo: Statamic
        }
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] bg-gradient-to-br from-[#14171F] via-[#14171F] to-[#2D1F54] p-0.5">
                <div className="rounded-[39px] bg-gradient-to-br from-[#14171F] via-[#14171F] to-[#2D1F54]">
                    <div className="px-6 py-16 sm:px-8 md:py-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Our customers love us
                                </h2>
                                <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-gray-300">
                                    Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi adipisicing officia excepteur tempor deserunt.
                                </p>
                            </div>

                            <div className="mx-auto mt-12">
                                <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                                    {brands.map((brand, index) => (
                                        <div 
                                            key={index} 
                                            className="flex justify-center"
                                        >
                                            <img
                                                className="h-10 w-auto object-contain brightness-0 invert"
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
            </div>
        </div>
    );
};

export default BrandAlternative; 