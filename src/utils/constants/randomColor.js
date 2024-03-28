const tailwindColorClasses = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-indigo-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-gray-100',
];

const generateRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
  return tailwindColorClasses[randomIndex];
};

export default generateRandomColor;
