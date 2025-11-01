import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { cropData } from '../data/Cropdata'; // Import your new dataset

// Helper function to determine the current season based on the month
const getCurrentSeason = () => {
  const month = new Date().getMonth(); // 0 (Jan) to 11 (Dec)
  if (month >= 5 && month <= 9) return 'Kharif'; // June to October
  if (month >= 10 || month <= 2) return 'Rabi'; // November to March
  return 'Zaid'; // April to May
};

const CropAdvisor = ({ onBack, lang, sensorData, profileData }) => {
  const { t } = useTranslation(lang);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('');

  useEffect(() => {
    setCurrentSeason(getCurrentSeason());
  }, []);

  // The updated "prediction" function.
  const getCropRecommendation = () => {
    setLoading(true);
    setRecommendation('');

    setTimeout(() => {
      let bestMatch = null;
      let minScore = Infinity;

      const currentConditions = {
        N: sensorData.nitrogen,
        P: sensorData.phosphorus,
        K: sensorData.potassium,
        pH: sensorData.ph,
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        soil: t(profileData.soilType), // Get translated soil type from profile
      };

      for (const dataPoint of cropData) {
        // First, filter out any crop that is not in the current season.
        if (dataPoint.season !== currentSeason) {
          continue; 
        }

        let score = 0;
        // Calculate the "difference score" to find the closest match
        score += Math.abs(currentConditions.N - dataPoint.N);
        score += Math.abs(currentConditions.P - dataPoint.P);
        score += Math.abs(currentConditions.K - dataPoint.K);
        score += Math.abs(currentConditions.pH - dataPoint.ph) * 20; // pH is very important
        score += Math.abs(currentConditions.temperature - dataPoint.temperature) * 2;
        score += Math.abs(currentConditions.humidity - dataPoint.humidity);

        // ✨ FIX: Add a robust check to ensure dataPoint.soil exists before comparing.
        // This prevents crashes if the dataset has any missing soil data.
        if (!dataPoint.soil || currentConditions.soil.toLowerCase() !== dataPoint.soil.toLowerCase()) {
          score += 1000;
        }

        if (score < minScore) {
          minScore = score;
          bestMatch = dataPoint;
        }
      }

      setRecommendation(bestMatch ? bestMatch.label : t('no_crop_found', { season: currentSeason }));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('crop_advisor_heading')}</h2>
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          {t('profile_cancel_button')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Display of the farm's current conditions */}
        <div className="card-style p-6">
          <h3 className="font-semibold mb-4 text-gray-700">{t('your_farm_conditions')}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p><strong>{t('nitrogen')}:</strong> {sensorData.nitrogen.toFixed(0)} {t('unit_kg_ha')}</p>
            <p><strong>{t('phosphorus')}:</strong> {sensorData.phosphorus.toFixed(0)} {t('unit_kg_ha')}</p>
            <p><strong>{t('potassium')}:</strong> {sensorData.potassium.toFixed(0)} {t('unit_kg_ha')}</p>
            <p><strong>{t('soil_ph')}:</strong> {sensorData.ph.toFixed(1)}</p>
            <p><strong>{t('temperature')}:</strong> {sensorData.temperature.toFixed(1)} {t('unit_celsius')}</p>
            <p><strong>{t('humidity')}:</strong> {sensorData.humidity.toFixed(1)} {t('unit_percent')}</p>
            <p><strong>{t('profile_soil_type')}:</strong> {t(profileData.soilType)}</p>
            <p><strong>{t('current_season')}:</strong> <span className="font-bold text-green-600">{t(currentSeason.toLowerCase())}</span></p>
          </div>
        </div>

        {/* Right Side: The recommendation engine */}
        <div className="card-style p-6 flex flex-col items-center justify-center text-center">
          <p className="mb-4 text-gray-600">
            {t('crop_advisor_prompt', { season: t(currentSeason.toLowerCase()) })}
          </p>
          <button
            onClick={getCropRecommendation}
            disabled={loading}
            className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? t('analyzing_button') : t('recommend_button')}
          </button>

          {recommendation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 w-full"
            >
              <p className="text-gray-600">{t('recommendation_result_text')}</p>
              <p className="text-4xl font-bold text-green-700 mt-2 animate-pulse">{recommendation}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAdvisor;

