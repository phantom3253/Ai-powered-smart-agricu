import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>

      {/* Main Leaf Shape */}
      <path
        d="M50,15 C25,30 25,60 50,90 C75,60 75,30 50,15 Z"
        fill="#22c55e"
      />

      {/* Left side - Natural veins */}
      <path
        d="M50 90V15 M50 35 C42 40 40 55 50 60 M50 60 C42 65 40 80 50 85"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Right side - Circuit/Tech pattern */}
      <path
        d="M50 35 L60 45 L50 55 L60 65 L50 75"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="45" r="2.5" fill="white" />
      <circle cx="60" cy="65" r="2.5" fill="white" />
    </svg>
  );
};

export default Logo;

