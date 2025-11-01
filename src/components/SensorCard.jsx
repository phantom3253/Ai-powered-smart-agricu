import React from "react";
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import { WiThermometer, WiHumidity, WiRaindrop } from "react-icons/wi";

const mockData = [
  { value: 48 }, { value: 46 }, { value: 50 },
  { value: 47 }, { value: 49 }, { value: 45 },
];

// ✨ NEW: A styled component for our text-based icons (N, P, K, pH)
const TextIcon = ({ children, color }) => (
  <div className={`font-bold text-3xl ${color}`}>
    {children}
  </div>
);

const SensorCard = ({ title, value, unit, icon: iconName }) => {
  const renderIcon = () => {
    // ✨ NEW: Added cases for ph, nitrogen, phosphorus, and potassium
    switch (iconName) {
      case 'temperature': return <WiThermometer className="text-red-500" />;
      case 'humidity': return <WiHumidity className="text-blue-500" />;
      case 'moisture': return <WiRaindrop className="text-cyan-500" />;
      case 'ph': return <TextIcon color="text-purple-500">pH</TextIcon>;
      case 'nitrogen': return <TextIcon color="text-orange-500">N</TextIcon>;
      case 'phosphorus': return <TextIcon color="text-indigo-500">P</TextIcon>;
      case 'potassium': return <TextIcon color="text-yellow-600">K</TextIcon>;
      default: return null;
    }
  };

  return (
    <div className="card-style p-4 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-5xl mr-3 w-12 text-center float-animate">
            {renderIcon()}
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase">{title}</div>
            <div className="flex items-end mt-1">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 ml-1 mb-px">{unit}</p>
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 font-semibold">Live</div>
      </div>
      <div className="mt-4 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2.5} dot={false} />
            <YAxis hide={true} domain={['dataMin - 5', 'dataMax + 5']} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorCard;