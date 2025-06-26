'use client';

import React from 'react';
import AwardsCarousel from '@/components/awards/AwardsCarousel';

export default function AwardsPage() {
  return (
    <div className="awards-page">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Awards & Recognitions</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          We take pride in our achievements and the recognition we've received for our dedication and innovation.
          These awards reflect our commitment to excellence and continuous improvement.
        </p>
        
        <AwardsCarousel />
      </div>
    </div>
  );
}
