'use client';

import { useState, useMemo, useEffect } from 'react';
import eventsData from '@/data/events.json';

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  rating?: number;
  isRegistered?: boolean;
  img?: string;
};

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const eventsPerPage = 9;

  // Helper function to parse event dates
  const parseEventDate = (dateString: string) => {
    // Handle various date formats from events.json
    const cleanDate = dateString.replace(/(\d+)(st|nd|rd|th)/g, '$1');
    let parsedDate = new Date(cleanDate);
    
    // If parsing fails, try different formats
    if (isNaN(parsedDate.getTime())) {
      // Try parsing formats like "4th March 2023"
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const parts = cleanDate.split(' ');
      if (parts.length >= 3) {
        const day = parseInt(parts[0]);
        const monthIndex = monthNames.findIndex(m => m.toLowerCase().startsWith(parts[1].toLowerCase()));
        const year = parseInt(parts[2]);
        if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
          parsedDate = new Date(year, monthIndex, day);
        }
      }
    }
    
    // If still invalid, default to a past date
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date('2023-01-01');
    }
    
    return parsedDate;
  };

  // Helper function to determine event category based on title
  const getEventCategory = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('workshop') || titleLower.includes('training')) return 'Workshop';
    if (titleLower.includes('hackathon') || titleLower.includes('hack')) return 'Hackathon';
    if (titleLower.includes('competition') || titleLower.includes('contest')) return 'Competition';
    if (titleLower.includes('conference') || titleLower.includes('summit')) return 'Conference';
    if (titleLower.includes('seminar') || titleLower.includes('talk')) return 'Seminar';
    if (titleLower.includes('forum') || titleLower.includes('meeting')) return 'Conference';
    if (titleLower.includes('day') || titleLower.includes('celebration')) return 'Community Service';
    if (titleLower.includes('webinar') || titleLower.includes('online')) return 'Webinar';
    if (titleLower.includes('team') || titleLower.includes('building')) return 'Community Service';
    return 'General';
  };

  useEffect(() => {
    // Load all events dynamically from events.json and assign default values for missing properties
    const enrichedEvents = eventsData.map((event, index) => ({
      id: index + 1,
      title: event.title,
      description: event.description || 'No description available',
      date: event.date,
      time: '09:00', // Default time
      location: event.location || 'TBA',
      category: getEventCategory(event.title),
      attendees: Math.floor(Math.random() * 200) + 50,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      isRegistered: false,
      img: event.img
    }));

    setEvents(enrichedEvents);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const formatDate = (dateString: string) => {
    const parsedDate = parseEventDate(dateString);
    return parsedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Workshop': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Competition': 'bg-blue-400/20 text-blue-200 border-blue-400/30',
      'Conference': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Seminar': 'bg-blue-700/20 text-blue-500 border-blue-700/30',
      'Community Service': 'bg-blue-800/20 text-blue-600 border-blue-800/30',
      'Summit': 'bg-blue-900/20 text-blue-700 border-blue-900/30',
      'Workshop Series': 'bg-blue-300/20 text-blue-100 border-blue-300/30',
      'Hackathon': 'bg-blue-200/20 text-blue-100 border-blue-200/30',
      'Webinar': 'bg-blue-100/20 text-blue-50 border-blue-100/30',
      'Tech Talk': 'bg-blue-50/20 text-blue-25 border-blue-50/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'; // Default color
  };

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
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center px-6 py-2 mb-8 glass rounded-full border border-white/10">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-gray-300 text-sm font-medium">Workshops • Competitions • Seminars</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="text-white">Events</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover our exciting events, workshops, and competitions that bring our community together
            </p>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-400">
              Showing {paginatedEvents.length} of {filteredEvents.length} events
            </p>
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {/* Events Grid */}
          {paginatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`glass-ultra rounded-3xl overflow-hidden hover-scale animate-slide-up group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-blue-600/30 flex items-center justify-center relative">
                    <span className="text-3xl font-black text-blue-300">{event.category}</span>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-sm">{formatDate(event.date)}</span>
                      {event.rating && (
                        <div className="flex items-center text-yellow-400 text-sm">
                          <span>⭐</span>
                          <span className="ml-1">{event.rating}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 8a2 2 0 11-4 0 2 2 0 014 0zM19 8a2 2 0 11-4 0 2 2 0 014 0zM17 13h-2v3a3 3 0 01-3 3H8a3 3 0 01-3-3v-3H3c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                        </svg>
                        <span>{event.attendees} attendees</span>
                      </div>
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                          event.isRegistered 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover-scale'
                        }`}
                      >
                        {event.isRegistered ? 'Registered' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-ultra rounded-3xl p-16 hover-scale">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 animate-float">
              <span className="text-3xl">📅</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Want to Organize an Event?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Have an idea for a workshop, competition, or seminar? We'd love to hear from you and help bring your vision to life!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-xl transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Contact Us
              <span className="ml-3 text-2xl">💡</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}