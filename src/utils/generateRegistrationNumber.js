export const generateRegistrationNumber = () => {
  const word = 'TICKRFLY';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += word.charAt(Math.floor(Math.random() * word.length));
  }
  return `${result}${Math.floor(100000 + Math.random() * 900000)}`;
}; 