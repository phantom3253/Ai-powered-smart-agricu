import React from "react";
import { INDIAN_LANGUAGES } from "../i18n/languages";

const LanguageSelector = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="w-full max-w-md p-6 glass-card">
        <h1 className="text-2xl font-bold text-green-700 mb-4">🌾 Select Language</h1>
        <p className="text-sm text-gray-600 mb-4">Choose your preferred language for the app.</p>

        <div className="grid grid-cols-2 gap-3">
          {INDIAN_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => onSelect(l.code)}
              className="p-3 rounded-lg border hover:shadow-md button-fancy"
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          You can change language later in Profile.
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
