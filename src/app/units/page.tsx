import data from '@/data/data.json';
import unitsData from '@/data/units.json';

export default function Units() {
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
              <span className="text-gray-300 text-sm font-medium">Chapters & Groups</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="text-white">Units</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our diverse chapters and groups that drive innovation and excellence in engineering
            </p>
          </div>
        </div>
      </section>

      {/* Units Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Our Units
              </span>
            </h2>
            <p className="text-xl text-gray-400">Chapters, societies, and groups advancing engineering excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(unitsData).map(([key, unit], index) => (
              <div
                key={key}
                className={`glass-ultra rounded-3xl p-8 hover-scale animate-slide-up group cursor-pointer relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Color accent based on unit color */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 opacity-60"
                  style={{ backgroundColor: unit.color }}
                ></div>
                
                <div className="relative mb-6">
                  <div 
                    className="w-full h-40 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative"
                    style={{ backgroundColor: `${unit.color}20` }}
                  >
                    <span className="text-3xl font-black" style={{ color: unit.color }}>
                      {unit.name}
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse flex items-center justify-center"
                       style={{ backgroundColor: unit.color }}>
                    <span className="text-white text-xs font-bold">✦</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {unit.name}
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: unit.color }}>
                  {unit.subName}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {unit.description}
                </p>
                
                {/* Stats */}
                <div className="flex justify-between items-center mb-6 text-xs">
                  <div className="text-center">
                    <div className="text-blue-300 font-bold text-lg">{unit.numberOfMembers}</div>
                    <div className="text-gray-500">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-300 font-bold text-lg">{unit.numberOfActivities}</div>
                    <div className="text-gray-500">Activities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-300 font-bold text-lg">{unit.foundation}</div>
                    <div className="text-gray-500">Founded</div>
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex justify-between items-center">
                  {unit.url && (
                    <a 
                      href={unit.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-semibold transition-colors hover:text-white"
                      style={{ color: unit.color }}
                    >
                      Facebook →
                    </a>
                  )}
                  {unit.website && (
                    <a 
                      href={unit.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-semibold transition-colors hover:text-white"
                      style={{ color: unit.color }}
                    >
                      Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Why Join Our Units?
              </span>
            </h2>
            <p className="text-xl text-gray-400">Benefits of being part of IEEE ESPRIT units</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Professional Development',
                description: 'Access to workshops, seminars, and certification programs to enhance your technical skills.'
              },
              {
                icon: '🤝',
                title: 'Networking Opportunities',
                description: 'Connect with industry professionals, researchers, and fellow students from around the world.'
              },
              {
                icon: '🚀',
                title: 'Career Advancement',
                description: 'Get access to internship opportunities, job placements, and mentorship programs.'
              },
              {
                icon: '📚',
                title: 'Technical Resources',
                description: 'Access to IEEE digital library, standards, and cutting-edge research publications.'
              },
              {
                icon: '🏆',
                title: 'Leadership Experience',
                description: 'Develop leadership skills by organizing events and leading technical projects.'
              },
              {
                icon: '🌍',
                title: 'Global Community',
                description: 'Be part of the world\'s largest technical professional organization with global reach.'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className={`glass-ultra rounded-3xl p-8 text-center hover-scale animate-slide-up group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-ultra rounded-3xl p-16 text-center hover-scale">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12">Our Unit Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="hover-scale">
                <div className="text-5xl md:text-6xl font-black text-blue-400 mb-4">{data.stats.chapters}</div>
                <div className="text-gray-300 font-semibold uppercase tracking-wide">Active Chapters</div>
              </div>
              <div className="hover-scale">
                <div className="text-5xl md:text-6xl font-black text-blue-300 mb-4">{data.stats.groups}</div>
                <div className="text-gray-300 font-semibold uppercase tracking-wide">Special Groups</div>
              </div>
              <div className="hover-scale">
                <div className="text-5xl md:text-6xl font-black text-blue-500 mb-4">{data.stats.members}+</div>
                <div className="text-gray-300 font-semibold uppercase tracking-wide">Total Members</div>
              </div>
              <div className="hover-scale">
                <div className="text-5xl md:text-6xl font-black text-blue-600 mb-4">{data.stats.activities}+</div>
                <div className="text-gray-300 font-semibold uppercase tracking-wide">Annual Activities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-ultra rounded-3xl p-16 hover-scale animate-glow">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 animate-float">
              <span className="text-3xl">⚡</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Join a Unit?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Choose the chapter or group that aligns with your interests and start your journey with us
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/join"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-xl transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Join Now
                <span className="ml-3 text-2xl">🚀</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-10 py-5 glass-strong border border-white/20 text-white rounded-2xl font-bold text-xl transition-all duration-500 hover-scale hover:bg-white/10 hover:border-white/30"
              >
                Learn More
                <span className="ml-3 text-2xl">💡</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
