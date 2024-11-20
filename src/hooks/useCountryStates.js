export const useCountryStates = () => {
  const countryStates = {
    GH: [ // Ghana
      'Ahafo', 
      'Ashanti', 
      'Bono', 
      'Bono East', 
      'Central', 
      'Eastern', 
      'Greater Accra', 
      'North East', 
      'Northern', 
      'Oti', 
      'Savannah', 
      'Upper East', 
      'Upper West', 
      'Volta', 
      'Western', 
      'Western North'
    ],
    NG: [ // Nigeria
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 
      'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 
      'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 
      'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 
      'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 
      'Yobe', 'Zamfara'
    ],
    // Add more countries as needed
  };

  const getStatesForCountry = (countryCode) => {
    return countryStates[countryCode] || [];
  };

  return { getStatesForCountry };
}; 