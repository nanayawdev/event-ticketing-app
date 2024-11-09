import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, UserCircle, Shield, CreditCard, Wallet, Bell, Building, Key, Link, FileText, Activity } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    bio: 'Event organizer with 5+ years of experience.',
    avatar: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Updated profile:', profile);
  };

  const menuItems = [
    {
      title: 'Personal Information',
      description: 'Update your name, email, phone number, and profile photo',
      icon: UserCircle
    },
    {
      title: 'Security Settings',
      description: 'Change password, enable 2FA, manage login devices',
      icon: Shield
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment methods and bank accounts',
      icon: CreditCard
    },
    {
      title: 'Payout Settings',
      description: 'Configure how you receive payments from ticket sales',
      icon: Wallet
    },
    {
      title: 'Notification Preferences',
      description: 'Choose what notifications you want to receive',
      icon: Bell
    },
    {
      title: 'Organization Profile',
      description: 'Manage your organization details and team members',
      icon: Building
    },
    {
      title: 'API Keys',
      description: 'Generate and manage API keys for integration',
      icon: Key
    },
    {
      title: 'Connected Accounts',
      description: 'Link your social media and other platform accounts',
      icon: Link
    },
    {
      title: 'Tax Information',
      description: 'Manage your tax documents and settings',
      icon: FileText
    },
    {
      title: 'Account Activity',
      description: 'View login history and recent activities',
      icon: Activity
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
      
      <div className="grid gap-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            className="flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors text-left group"
          >
            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <item.icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile; 