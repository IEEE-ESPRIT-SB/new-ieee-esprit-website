import Link from 'next/link';
import data from '@/data/data.json';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-5 animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-blue-600 rounded-full opacity-5 animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-5 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 mb-8 glass rounded-full border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-gray-300 text-sm font-medium">IEEE ESPRIT Student Branch • Est. 2010</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Welcome to
            </span>
            <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              IEEE ESPRIT SB
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Empowering the next generation of engineers and innovators to shape the future of technology
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link
              href="/join"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover-scale transform hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Join Our Community</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              href="/about"
              className="group glass-strong border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover-scale hover:bg-white/10 hover:border-white/30 hover:shadow-2xl"
            >
              Discover More
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          
          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: data.stats.members, label: 'Active Members', color: 'text-blue-400' },
              { value: data.stats.chapters, label: 'Chapters', color: 'text-blue-300' },
              { value: data.stats.activities, label: 'Annual Events', color: 'text-blue-500' },
              { value: data.stats.awards, label: 'Awards Won', color: 'text-blue-200' }
            ].map((stat, index) => (
              <div key={stat.label} className={`text-center animate-slide-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>{stat.value}+</div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Section Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent"></div> */}
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Explore Our Universe
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Dive into our diverse ecosystem of chapters, groups, and opportunities that await you
            </p>
          </div>
          
          {/* Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[...data.chapters.slice(0, 3), ...data.groups].slice(0, 6).map((unit, index) => (
              <div
                key={unit.id}
                className={`group glass-ultra rounded-3xl p-8 hover-scale transition-all duration-700    animate-slide-up cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Unit Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-black text-blue-300">
                      {unit.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                </div>
                
                {/* Unit Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {unit.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{unit.description}</p>
                
                {/* Learn More Link */}
                <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                  <span>Learn More</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Units Button */}
          <div className="text-center">
            <Link
              href="/units"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-red-500/25"
            >
              Explore All Units
              <span className="ml-3 text-xl">🚀</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Gradient Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-slate-950/30 to-blue-950/30"></div> */}
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="glass-ultra rounded-3xl p-16 hover-scale animate-glow">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 animate-float">
              <span className="text-3xl">⚡</span>
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Shape the Future?
            </h2>
            
            {/* Subheading */}
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the world's largest technical professional organization and connect with innovators, engineers, and visionaries who are building tomorrow's technology today.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: '🌐', title: 'Global Network', desc: '400,000+ members worldwide' },
                { icon: '🎓', title: 'Learning', desc: 'Exclusive workshops & resources' },
                { icon: '🚀', title: 'Career Growth', desc: 'Internships & job opportunities' }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <Link
              href="/join"
              className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-xl transition-all duration-500 hover-scale hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Start Your Journey
              <span className="ml-3 text-2xl">✨</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
