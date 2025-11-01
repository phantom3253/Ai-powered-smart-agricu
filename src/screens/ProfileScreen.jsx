import React, { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { toast } from 'react-hot-toast';

// This component now receives the profile data and a function to update it
const ProfileScreen = ({ onBack, lang, profileData, setProfileData }) => {
  const { t } = useTranslation(lang);
  
  // Local state to manage the form inputs, initialized with the current profile data
  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData(formData); // Update the main app's state
    toast.success(t('profile_save_success'));
    onBack(); // Go back to the dashboard after saving
  };

  const cropOptions = ['crop_wheat', 'crop_rice', 'crop_sugarcane', 'crop_cotton'];
  const soilOptions = ['soil_black', 'soil_red', 'soil_sandy', 'soil_alluvial'];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{t('profile_title')}</h2>
          <p className="text-gray-500 mt-2">{t('profile_subtitle')}</p>
        </header>

        <form onSubmit={handleSave} className="card-style p-8 space-y-6">
          {/* Farmer's Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('profile_name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Location Input */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('profile_location')}</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Crop Type Dropdown */}
          <div>
            <label htmlFor="cropType" className="block text-sm font-medium text-gray-700">{t('profile_crop_type')}</label>
            <select
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              {cropOptions.map(cropKey => (
                <option key={cropKey} value={cropKey}>{t(cropKey)}</option>
              ))}
            </select>
          </div>

          {/* Soil Type Dropdown */}
          <div>
            <label htmlFor="soilType" className="block text-sm font-medium text-gray-700">{t('profile_soil_type')}</label>
            <select
              id="soilType"
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              {soilOptions.map(soilKey => (
                <option key={soilKey} value={soilKey}>{t(soilKey)}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
            >
              {t('profile_save_button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
