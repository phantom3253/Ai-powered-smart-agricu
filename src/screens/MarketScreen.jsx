import React from "react";

const crops = [
  { name: "Wheat", price: "₹2000/quintal" },
  { name: "Rice", price: "₹2200/quintal" },
  { name: "Maize", price: "₹1800/quintal" },
];

const MarketScreen = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">📊 Market Prices</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">Back</button>
      </header>

      <div className="grid gap-3">
        {crops.map((c, idx) => (
          <div key={idx} className="glass-card p-3 flex justify-between items-center">
            <span className="font-semibold">{c.name}</span>
            <span className="text-green-700">{c.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketScreen;
