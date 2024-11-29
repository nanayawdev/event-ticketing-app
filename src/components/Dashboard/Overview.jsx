import React, { useState, useEffect } from 'react';
import { Users, Clock, Ticket, TrendingUp, Tag, Eye, Percent } from 'lucide-react';
import { usePayment } from '../../context/PaymentContext';
import { formatCurrency } from '../../utils/currencyConverter';
import { checkAuthAndGetProfile } from '../../utils/auth';

const Overview = () => {
  const { selectedCurrency, convertCurrency } = usePayment();
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await checkAuthAndGetProfile();
        if (userData && userData.BusinessName) {
          setBusinessName(userData.BusinessName);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const formatValue = (value, isCurrency = true) => {
    if (!isCurrency) return value;
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (isNaN(numericValue)) return value;
    
    const convertedValue = convertCurrency(numericValue, 'GHS', selectedCurrency);
    return formatCurrency(convertedValue || 0, selectedCurrency);
  };

  const stats = [
    { 
      title: 'Registrations', 
      value: '0 / 0', 
      icon: Users, 
      subtitle: 'Current / Capacity',
      color: 'blue',
      isCurrency: false
    },
    { 
      title: 'Revenue Achieved', 
      value: '₵ 0', 
      icon: TrendingUp, 
      subtitle: 'Total confirmed payments',
      color: 'green',
      isCurrency: true
    },
    { 
      title: 'Revenue Expected', 
      value: '₵ 0', 
      icon: Ticket, 
      subtitle: 'Based on total registrations',
      color: 'purple',
      isCurrency: true
    },
    { 
      title: 'Revenue Pending', 
      value: '₵ 0', 
      icon: Clock,
      subtitle: 'Awaiting payment',
      color: 'yellow',
      isCurrency: true
    },
    { 
      title: 'Total Discount', 
      value: '₵ 0', 
      icon: Tag,
      subtitle: 'Applied discounts',
      color: 'pink',
      isCurrency: true
    },
    { 
      title: 'Event Views', 
      value: '0', 
      icon: Eye,
      subtitle: 'Total page views',
      color: 'indigo',
      isCurrency: false
    },
    { 
      title: 'Commission Rate', 
      value: '7.50%', 
      icon: Percent,
      subtitle: 'Platform fee',
      color: 'gray',
      isCurrency: false
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {businessName ? `Welcome, ${businessName}` : 'Welcome'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {formatValue(stat.value, stat.isCurrency)}
              </p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview; 