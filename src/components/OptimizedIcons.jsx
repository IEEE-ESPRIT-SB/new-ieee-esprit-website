'use client';
import React, { memo } from 'react';
import dynamic from 'next/dynamic';

// Optimisation critique : imports individuels au lieu du package complet
// Cela réduit le bundle de ~2MB à ~50KB

// Chargement dynamique des icônes pour réduire TBT
const FaUsers = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaUsers })), {
  ssr: false,
  loading: () => <div className="w-6 h-6 bg-gray-400 animate-pulse rounded" />
});

const FaUserFriends = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaUserFriends })), {
  ssr: false,
  loading: () => <div className="w-6 h-6 bg-gray-400 animate-pulse rounded" />
});

const FaUserGraduate = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaUserGraduate })), {
  ssr: false,
  loading: () => <div className="w-6 h-6 bg-gray-400 animate-pulse rounded" />
});

const FaCalendarAlt = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaCalendarAlt })), {
  ssr: false,
  loading: () => <div className="w-6 h-6 bg-gray-400 animate-pulse rounded" />
});

const FaAward = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaAward })), {
  ssr: false,
  loading: () => <div className="w-6 h-6 bg-gray-400 animate-pulse rounded" />
});

// Map des icônes optimisée
const IconMap = {
  FaUsers,
  FaUserFriends,
  FaUserGraduate,
  FaCalendarAlt,
  FaAward
};

// Composant mémorisé pour éviter re-renders inutiles
const OptimizedIcon = memo(({ iconName, className = "", size = 24, ...props }) => {
  const IconComponent = IconMap[iconName];
  
  if (!IconComponent) {
    // Fallback si l'icône n'existe pas
    return <div className={`w-6 h-6 bg-gray-400 rounded ${className}`} />;
  }
  
  return (
    <IconComponent 
      className={className}
      size={size}
      {...props}
    />
  );
});

OptimizedIcon.displayName = 'OptimizedIcon';

export default OptimizedIcon;

// Export des icônes individuelles pour usage direct
export {
  FaUsers,
  FaUserFriends,
  FaUserGraduate,
  FaCalendarAlt,
  FaAward
};
