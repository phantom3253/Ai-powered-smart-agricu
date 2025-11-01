import React, { useState } from "react";

const FertilizerCalculator = ({ onBack }) => {
  const [area, setArea] = useState("");
  const [crop, setCrop] = useState("");
  const [result, setResult] = useState("");
  // 👇 State to keep track of the error message
  const [error, setError] = useState("");

  const calculate = () => {
    // Check if either field is empty
    if (!area || !crop) {
      setError("Please enter all fields");
      setResult(""); // Clear any previous result
      return;
    }

    // If everything is okay, clear the error and set the result
    setError("");
    setResult(`For ${area} acres of ${crop}, apply approx. ${area * 50} kg of fertilizer.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">🧮 Fertilizer Calculator</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">Back</button>
      </header>

      <div className="glass-card p-4 space-y-4">
        <div>
          <input
            type="number"
            placeholder="Enter area (acres)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            // 👇 This className is now dynamic. It adds a red border if there's an error and this field is empty.
            className={`w-full border p-2 rounded transition-colors ${error && !area ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter crop name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            // 👇 Same dynamic className for the crop input
            className={`w-full border p-2 rounded transition-colors ${error && !crop ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          />
        </div>
        
        {/* 👇 Display the error message in red text if it exists */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button onClick={calculate} className="w-full bg-green-600 text-white rounded p-2 hover:bg-green-700">Calculate</button>

        {/* 👇 Show a styled result box only if there is a result */}
        {result && (
            <div className="p-3 bg-green-50 border border-green-200 rounded text-center text-green-800">
                {result}
            </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerCalculator;