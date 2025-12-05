import React, { useState } from "react";

const PlantDiagnosis = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // When farmer uploads / takes photo
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // Send photo to AI model
  const diagnosePlant = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setResult(null);

    const API_URL =
      "https://api-inference.huggingface.co/models/prakashpoudel/plant-disease-classification";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}`,
      },
      body: selectedImage,
    });

    const data = await response.json();
    setLoading(false);

    setResult(data);
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 bg-gray-200 px-4 py-2 rounded shadow"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">🌿 Plant Disease Diagnosis</h1>

      {/* Upload Photo / Open Camera */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
        className="mb-4"
      />

      {/* Preview Image */}
      {preview && (
        <img
          src={preview}
          alt="plant leaf"
          className="w-72 h-72 object-cover rounded-lg shadow mb-4"
        />
      )}

      {/* Diagnose Button */}
      <button
        onClick={diagnosePlant}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Diagnose Disease"}
      </button>

      {/* Show Result */}
      {result && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Diagnosis Result:</h2>

          {result.error ? (
            <p className="text-red-500 mt-2">Error: {result.error}</p>
          ) : (
            <div className="mt-2">
              <p className="text-lg">
                <strong>Disease:</strong> {result[0].label}
              </p>
              <p className="text-gray-700">
                <strong>Confidence:</strong>{" "}
                {(result[0].score * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantDiagnosis;
