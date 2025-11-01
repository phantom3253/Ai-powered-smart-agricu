import React, { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

const PlantDiagnosis = ({ onBack, lang }) => {
  const { t } = useTranslation(lang);
  const [symptom, setSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = () => {
    if (symptom.toLowerCase().includes("yellow")) {
      setDiagnosis("Possible Nitrogen deficiency. Add urea.");
    } else if (symptom.toLowerCase().includes("spots")) {
      setDiagnosis("Possible fungal infection. Use fungicide.");
    } else if (symptom.toLowerCase().includes("wilting")) {
      setDiagnosis("Soil moisture low. Irrigate immediately.");
    } else {
      setDiagnosis("Symptom not recognized. Consider uploading a photo.");
    }
  };

  const handleImage = (file) => {
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setDiagnosis("");
  };

  const handleFromPhoto = () => {
    if (!image) {
      setDiagnosis("Upload a photo first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setDiagnosis("Image reviewed: possible early-blight. Recommend fungicide.");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">🌿 Plant Diagnosis</h2>
        <button onClick={onBack} className="px-3 py-1 bg-green-500 text-white rounded">
          Back
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Enter Symptom:</label>
          <input
            type="text"
            placeholder="e.g. Yellow leaves"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button onClick={handleDiagnosis} className="mt-3 px-4 py-2 bg-green-600 text-white rounded w-full">
            Diagnose
          </button>
          <div className="mt-4 p-3 border rounded bg-gray-100">
            <h3 className="font-bold">Result:</h3>
            <p>{diagnosis}</p>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">{t("upload_photo")}</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files[0])} className="mb-3" />
          {image && (
            <div>
              <img src={image} alt="preview" className="img-preview w-full h-auto object-cover mb-2" />
              <div className="flex gap-2">
                <button
                  onClick={handleFromPhoto}
                  disabled={loading}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded"
                >
                  {loading ? "Checking..." : t("diagnose_photo")}
                </button>
                <button onClick={() => { setImage(null); setDiagnosis(""); }} className="px-3 py-2 bg-gray-200 rounded">
                  Clear
                </button>
              </div>
            </div>
          )}
          {!image && <div className="text-sm text-gray-500">No photo selected.</div>}
        </div>
      </div>
    </div>
  );
};

export default PlantDiagnosis;
