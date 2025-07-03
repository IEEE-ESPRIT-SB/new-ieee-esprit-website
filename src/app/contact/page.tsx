'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'ieee@esprit.tn',
      link: 'mailto:ieee@esprit.tn'
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+216 XX XXX XXX',
      link: 'tel:+216XXXXXXXX'
    },
    {
      icon: '📍',
      title: 'Location',
      details: 'ESPRIT School of Engineering\nAriana, Tunisia',
      link: 'https://maps.google.com/?q=ESPRIT+Ariana+Tunisia'
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: 'Monday - Friday\n9:00 AM - 5:00 PM',
      link: null
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: '📘',
      href: '#',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      href: '#',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: '📷',
      href: '#',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      href: '#',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(96,165,250,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out to us for any questions, suggestions, or collaboration opportunities.
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="glass rounded-xl p-6 hover-scale hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3 filter drop-shadow-glow">{info.icon}</div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm whitespace-pre-line"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm whitespace-pre-line">{info.details}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Location Note */}
            <div className="glass-strong rounded-xl p-6 mb-8 border border-blue-500/20">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-3">📍 Find Us</h3>
              <p className="text-gray-300 mb-4">
                We're located in ESPRIT, Obviously! 😄
              </p>
              <p className="text-gray-300 text-sm">
                ESPRIT School of Engineering is located in Ariana, Tunisia. You can find us on campus during regular business hours.
              </p>
            </div>

            {/* Social Media */}
            <div className="glass rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-2xl ${social.color} transition-all duration-300 hover-scale filter hover:drop-shadow-glow`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-strong rounded-xl p-8 border border-blue-500/20">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8 animate-scale-in">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="events">Event Information</option>
                      <option value="collaboration">Collaboration Proposal</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover-scale hover-glow focus-ring disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 animate-slide-up">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Location</h2>
          <div className="glass rounded-xl overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-white mb-2">ESPRIT School of Engineering</h3>
                <p className="text-gray-300 mb-4">Ariana, Tunisia</p>
                <a
                  href="https://maps.google.com/?q=ESPRIT+Ariana+Tunisia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-scale focus-ring"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How can I become a member?",
                answer: "Visit our 'Join Us' page and fill out the application form. We review applications regularly and will contact you with next steps."
              },
              {
                question: "What are the membership benefits?",
                answer: "Members get access to workshops, networking events, technical resources, career opportunities, and the global IEEE community."
              },
              {
                question: "Are there any membership fees?",
                answer: "IEEE membership has annual fees, but we offer student discounts and financial assistance programs. Contact us for details."
              },
              {
                question: "Can I join multiple chapters?",
                answer: "Yes! You can participate in multiple chapters and groups based on your interests and availability."
              }
            ].map((faq, index) => (
              <div key={index} className={`glass rounded-xl p-6 animate-slide-up border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-3">{faq.question}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
