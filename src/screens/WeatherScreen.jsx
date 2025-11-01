import React, { useState, useEffect } from "react";

const WeatherScreen = ({ onBack }) => {
  const [weather, setWeather] = useState({ temp: 29, condition: "Sunny" });

  useEffect(() => {
    // Simulate live update
    const interval = setInterval(() => {
      setWeather((w) => ({
        temp: w.temp + (Math.random() > 0.5 ? 1 : -1),
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">🌦️ Weather</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">Back</button>
      </header>

      <div className="glass-card p-6 flex flex-col items-center">
        <div className="text-6xl mb-3">{weather.condition === "Sunny" ? "☀️" : weather.condition === "Cloudy" ? "☁️" : "🌧️"}</div>
        <div className="text-2xl font-bold">{weather.temp}°C</div>
        <div className="text-gray-600">{weather.condition}</div>
      </div>
    </div>
  );
};

export default WeatherScreen;
