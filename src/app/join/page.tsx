'use client';

import { useState } from 'react';
import data from '@/data/data.json';

export default function JoinUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    year: '',
    major: '',
    interests: [] as string[],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const interestOptions = [
    ...data.chapters.map(chapter => chapter.name),
    ...data.groups.map(group => group.name)
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="glass-ultra rounded-3xl p-12 animate-scale-in hover-scale">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white mb-6">Application Submitted! ✨</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Thank you for your interest in joining IEEE ESPRIT SB. We'll review your application and get back to you soon.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  year: '',
                  major: '',
                  interests: [],
                  message: ''
                });
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-5 animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-blue-600 rounded-full opacity-5 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-6 py-2 mb-8 glass rounded-full border border-white/10">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-gray-300 text-sm font-medium">Join Our Community</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Join IEEE
              </span>
              <br />
              <span className="text-white">ESPRIT SB</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Become part of the largest student engineering organization and shape your future in technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Benefits Section */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-black text-white mb-12">Why Join Us?</h2>
              <div className="space-y-8">
                {[
                  {
                    icon: '🚀',
                    title: 'Career Development',
                    description: 'Access to internships, job opportunities, and professional mentorship programs.'
                  },
                  {
                    icon: '🤝',
                    title: 'Global Network',
                    description: 'Connect with over 400,000 IEEE members worldwide and build lasting professional relationships.'
                  },
                  {
                    icon: '📚',
                    title: 'Learning Resources',
                    description: 'Free access to IEEE digital library, research papers, and cutting-edge technical content.'
                  },
                  {
                    icon: '🎯',
                    title: 'Skills Development',
                    description: 'Participate in workshops, competitions, and projects to enhance your technical skills.'
                  },
                  {
                    icon: '🏆',
                    title: 'Leadership Opportunities',
                    description: 'Take on leadership roles and organize events to develop your management skills.'
                  },
                  {
                    icon: '🌍',
                    title: 'Community Impact',
                    description: 'Contribute to humanitarian projects and make a positive impact on society.'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-6 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{benefit.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 glass-ultra rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Membership Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-2">{data.stats.members}+</div>
                    <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-300 mb-2">{data.stats.activities}+</div>
                    <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide">Annual Events</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-ultra rounded-3xl p-12">
                <h2 className="text-3xl font-black text-white mb-8">Application Form</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-bold text-gray-300 mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-bold text-gray-300 mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-300 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="year" className="block text-sm font-bold text-gray-300 mb-3">
                        Academic Year *
                      </label>
                      <select
                        id="year"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="5th">5th Year</option>
                        <option value="graduate">Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="major" className="block text-sm font-bold text-gray-300 mb-3">
                        Major *
                      </label>
                      <input
                        type="text"
                        id="major"
                        name="major"
                        required
                        value={formData.major}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      Areas of Interest
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="w-5 h-5 text-blue-500 bg-white bg-opacity-10 border-white border-opacity-20 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-3">
                      Why do you want to join IEEE ESPRIT SB?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your motivations and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white py-5 px-8 rounded-xl font-bold text-lg transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <span>Submit Application</span>
                        <span className="text-xl">✨</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
