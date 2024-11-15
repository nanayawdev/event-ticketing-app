import React from 'react';

const MostRead = () => {
  const newsItems = [
    {
      id: 1,
      title: "'Football's biggest waste' - Adriano admits he's drinkin..."
    },
    {
      id: 2,
      title: "Vini's nightmare goes on as Brazil drop more WCQ points"
    },
    {
      id: 3,
      title: "Mbappe-Deschamps dispute rumours threaten to derail..."
    },
    {
      id: 4,
      title: "Endrick set to be offered 'escape route' out of Real..."
    },
    {
      id: 5,
      title: "Amorim told he's already made his first mistake at M..."
    },
    {
      id: 6,
      title: "Transfers LIVE: Arsenal plotting Zubimendi swoop"
    },
    {
      id: 7,
      title: "Man Utd flop has 'no intention' of leaving amid..."
    },
    {
      id: 8,
      title: "Where's Tuchel?! England are wasting time without ne..."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-4 sm:py-5 lg:py-6 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6">
        <h2 className="text-black dark:text-white text-xl sm:text-2xl lg:text-[28px] font-bold mb-4 sm:mb-5 lg:mb-6">
          MOST READ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-y-5 lg:gap-y-6">
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative flex items-start ${
                index > 0 && index % 4 !== 0 ? 'lg:pl-6 before:lg:absolute before:lg:left-0 before:lg:top-0 before:lg:h-full before:lg:w-[1px] before:lg:bg-gray-600' : ''
              } ${
                index > 0 && index % 2 !== 0 ? 'sm:pl-6 before:sm:absolute before:sm:left-0 before:sm:top-0 before:sm:h-full before:sm:w-[1px] before:sm:bg-gray-600 lg:before:hidden' : ''
              }`}
            >
              <span className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl lg:text-2xl font-bold w-6 sm:w-7 lg:w-8">
                {item.id}
              </span>
              <a 
                href="#" 
                className="text-gray-900 dark:text-white hover:text-primary-500 text-sm sm:text-base leading-tight flex-1 min-w-0 pr-4"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostRead; 