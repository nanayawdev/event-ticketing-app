import React from 'react';

const stats = [
  { id: 1, name: 'events hosted in the last 3 months', value: '44 thousand' },
  { id: 2, name: 'creators using our services', value: '10 thousand' },
  { id: 3, name: 'countries supported', value: '20' },
];

const Stats = () => {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-100">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="h-px bg-gray-200"></div>
      </div>
    </>
  );
};

export default Stats; 