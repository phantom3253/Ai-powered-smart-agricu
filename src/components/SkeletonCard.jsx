import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
    <div className="animate-pulse flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-12 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </div>
      <div className="mt-4 h-20 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export default SkeletonCard;

