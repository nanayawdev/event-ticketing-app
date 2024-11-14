import React from 'react';
import { 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineChatBubbleBottomCenterText, 
  HiOutlinePhone, 
  HiOutlineMap,
  HiOutlineTicket,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck
} from 'react-icons/hi2';

const ContactOptions = () => {
  const options = [
    {
      icon: <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-primary-500" />,
      title: 'Event Support',
      description: 'Need help with tickets or event access?',
      action: 'support@tickrfly.com',
      href: 'mailto:support@tickrfly.com'
    },
    {
      icon: <HiOutlineChatBubbleBottomCenterText className="w-6 h-6 text-primary-500" />,
      title: 'Event Organizers',
      description: 'Want to host your event with us?',
      action: 'partners@tickrfly.com',
      href: 'mailto:partners@tickrfly.com'
    },
    {
      icon: <HiOutlinePhone className="w-6 h-6 text-primary-500" />,
      title: 'Priority Support',
      description: 'Urgent help on event day.',
      action: '+233 (555) 000-0000',
      href: 'tel:+233555000000'
    },
    {
      icon: <HiOutlineMap className="w-6 h-6 text-primary-500" />,
      title: 'Corporate Office',
      description: 'For business & partnership inquiries.',
      action: 'Visit Our Office',
      href: '#'
    },
    {
      icon: <HiOutlineTicket className="w-6 h-6 text-primary-500" />,
      title: 'Ticket Issues',
      description: 'Problems with your tickets?',
      action: 'tickets@tickrfly.com',
      href: 'mailto:tickets@tickrfly.com'
    },
    {
      icon: <HiOutlineUserGroup className="w-6 h-6 text-primary-500" />,
      title: 'Group Bookings',
      description: 'Book tickets for large groups.',
      action: 'groups@tickrfly.com',
      href: 'mailto:groups@tickrfly.com'
    },
    {
      icon: <HiOutlineCreditCard className="w-6 h-6 text-primary-500" />,
      title: 'Payment Support',
      description: 'Issues with payments or refunds?',
      action: 'billing@tickrfly.com',
      href: 'mailto:billing@tickrfly.com'
    },
    {
      icon: <HiOutlineQuestionMarkCircle className="w-6 h-6 text-primary-500" />,
      title: 'General Inquiries',
      description: 'Other questions or concerns?',
      action: 'info@tickrfly.com',
      href: 'mailto:info@tickrfly.com'
    },
    {
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-primary-500" />,
      title: 'Security & Trust',
      description: 'Report security concerns or fraud.',
      action: 'security@tickrfly.com',
      href: 'mailto:security@tickrfly.com'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {options.map((option, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center text-center p-6 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="mb-4 p-3 bg-primary-50/10 dark:bg-gray-700/50 rounded-md border border-primary-100 dark:border-gray-700">
            {option.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {option.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {option.description}
          </p>
          <a 
            href={option.href}
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            {option.action}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactOptions;
