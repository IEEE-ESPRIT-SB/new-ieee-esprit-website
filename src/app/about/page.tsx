import data from '@/data/data.json';
import exboardData from '@/data/exboard.json';

export default function About() {
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
              <span className="text-gray-300 text-sm font-medium">About Our Organization</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                About IEEE
              </span>
              <br />
              <span className="text-white">ESPRIT SB</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover our mission, vision, and the passionate team driving innovation at ESPRIT
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            <div className="glass-ultra rounded-3xl p-12 animate-slide-up hover-scale">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="text-3xl font-black text-blue-400 mb-6">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{data.mission}</p>
            </div>
            <div className="glass-ultra rounded-3xl p-12 animate-slide-up hover-scale" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-6">🔮</div>
              <h2 className="text-3xl font-black text-blue-400 mb-6">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{data.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Our Impact in Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-400">The metrics that define our community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { label: 'Chapters', value: data.stats.chapters, icon: '🏢', color: 'text-blue-400' },
              { label: 'Groups', value: data.stats.groups, icon: '👥', color: 'text-blue-300' },
              { label: 'Members', value: data.stats.members, icon: '🎓', color: 'text-blue-500' },
              { label: 'Annual Activities', value: data.stats.activities, icon: '📅', color: 'text-blue-200' },
              { label: 'Awards', value: data.stats.awards, icon: '🏆', color: 'text-blue-600' }
            ].map((stat, index) => (
              <div key={stat.label} className={`glass-ultra rounded-2xl p-8 text-center hover-scale animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-3`}>{stat.value}+</div>
                <div className="text-gray-300 font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Executive Committee
              </span>
            </h2>
            <p className="text-xl text-gray-400">Meet the leaders driving our mission forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exboardData.map((member, index) => (
              <div key={member.name} className={`glass-ultra rounded-3xl p-8 text-center hover-scale animate-slide-up group cursor-pointer`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {member.img ? (
                      <img 
                        src={`/assets/exboard/${member.img}`} 
                        alt={member.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <span className="text-2xl font-black text-blue-300">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-semibold text-sm mb-4">{member.position}</p>
                <div className="flex justify-center space-x-3">
                  {member.fb && (
                    <a href={member.fb} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                      <span className="text-sm">📘</span>
                    </a>
                  )}
                  {member.insta && (
                    <a href={member.insta} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                      <span className="text-sm">📷</span>
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                      <span className="text-sm">💼</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Our Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-400">Recognition of our excellence and impact</p>
          </div>
          
          <div className="glass-ultra rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.awards.map((award, index) => (
                <div key={index} className={`flex items-start space-x-4 animate-slide-up group`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">{award}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-ultra rounded-3xl p-16 hover-scale animate-glow">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 animate-float">
              <span className="text-3xl">💡</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Want to Learn More?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">Get in touch with us or join our community to be part of something extraordinary</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Contact Us
                <span className="ml-3">📧</span>
              </a>
              <a
                href="/join"
                className="inline-flex items-center px-8 py-4 glass-strong border border-white/20 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover-scale hover:bg-white/10 hover:border-white/30"
              >
                Join Us
                <span className="ml-3">🚀</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
