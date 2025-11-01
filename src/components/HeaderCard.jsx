import React from 'react';

const HeaderCard = ({ t, profileData }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const welcomeMessage = t('welcome_back_message', { name: profileData.name });

  return (
    // ✨ UPDATED: Replaced old classes with a subtle gradient and modern styling
    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{welcomeMessage}</h2>
          <p className="text-gray-500 mt-1">Here's your farm's status for {currentDate}.</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-base font-semibold text-green-600">System Status</p>
          <p className="text-sm text-gray-500">All sensors are online.</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;

