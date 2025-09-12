import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBook, FaUsers, FaHeartbeat, FaArrowRight, FaLeaf, FaLock, FaUserMd, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ value, label, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border-l-4 ${color} transition-all duration-300 hover:shadow-lg`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-600', '-100')} text-${color.replace('border-l-', '')}`}>
        <Icon className="text-2xl" />
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</div>
        <div className="text-gray-600 text-sm font-medium">{label}</div>
      </div>
    </div>
  </motion.div>
);

const FeatureCard = ({ title, description, icon, color, onClick }) => {
  const colors = {
    pink: 'from-pink-500 to-rose-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-indigo-500'
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-1 shadow-lg cursor-pointer h-full`}
    >
      <div className="bg-white rounded-xl p-6 h-full flex flex-col group">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-2xl mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <div className="flex items-center text-sm font-medium text-pink-600 group-hover:text-pink-700 transition-colors">
          Learn more
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Home = ({ onNavigate }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [stats] = useState({
    totalUsers: 12847,
    symptomsTracked: 156234,
    resourcesAccessed: 89456,
    communityPosts: 3421
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaHeartbeat className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PCOS Health! 🎉</h2>
                <p className="text-gray-600">Your journey to better PCOS management starts here</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Track symptoms and health metrics',
                  'Access expert-curated resources',
                  'Connect with a supportive community',
                  'Get personalized insights'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowWelcome(false);
                    onNavigate && onNavigate('symptoms');
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start Tracking Now</span>
                  <FaArrowRight className="text-sm" />
                </button>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Explore First
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
          >
            Empowering Women with PCOS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Take Control of Your <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">PCOS Journey</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Your all-in-one platform for symptom tracking, personalized insights, and connecting with a supportive community of women who understand.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <button 
              onClick={() => onNavigate && onNavigate('symptoms')}
              className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get Started for Free</span>
              <FaArrowRight className="text-sm" />
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('about')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-pink-100">
            <div className="flex items-center">
              <FaLock className="mr-2" /> Secure & Private
            </div>
            <div className="flex items-center">
              <FaMobileAlt className="mr-2" /> Mobile Friendly
            </div>
            <div className="flex items-center">
              <FaUserMd className="mr-2" /> Expert-Approved
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4"
          >
            <StatCard 
              value={stats.totalUsers} 
              label="Active Users" 
              icon={FaUsers} 
              color="border-l-pink-600"
            />
            <StatCard 
              value={stats.symptomsTracked} 
              label="Symptoms Tracked" 
              icon={FaChartLine} 
              color="border-l-blue-600"
            />
            <StatCard 
              value={stats.resourcesAccessed} 
              label="Resources Accessed" 
              icon={FaBook} 
              color="border-l-purple-600"
            />
            <StatCard 
              value={stats.communityPosts} 
              label="Community Posts" 
              icon={FaUsers} 
              color="border-l-green-600"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Manage PCOS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive tools designed specifically for women with PCOS</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              title="Symptom Tracking"
              description="Monitor your PCOS symptoms, menstrual cycles, and health patterns with our intuitive tracking tools."
              icon={<FaHeartbeat />}
              color="pink"
              onClick={() => onNavigate && onNavigate('symptoms')}
            />
            <FeatureCard
              title="Educational Resources"
              description="Access evidence-based information about PCOS management, nutrition, and lifestyle modifications."
              icon={<FaBook />}
              color="blue"
              onClick={() => onNavigate && onNavigate('resources')}
            />
            <FeatureCard
              title="Community Support"
              description="Connect with other women managing PCOS and share experiences in a supportive environment."
              icon={<FaUsers />}
              color="purple"
              onClick={() => onNavigate && onNavigate('community')}
            />
          </div>
          
          {/* How It Works */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-center mb-10">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaUserMd className="text-2xl text-pink-600" />,
                  title: "Create Your Profile",
                  description: "Set up your personal health profile in minutes"
                },
                {
                  icon: <FaChartLine className="text-2xl text-blue-600" />,
                  title: "Track Your Symptoms",
                  description: "Log symptoms, moods, and health metrics daily"
                },
                {
                  icon: <FaLeaf className="text-2xl text-green-600" />,
                  title: "Get Insights",
                  description: "Discover patterns and get personalized recommendations"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of women who have taken control of their PCOS journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                quote: "This app has been a game-changer for managing my PCOS symptoms. I finally feel in control of my health.",
                author: "Sarah M.",
                role: "PCOS Warrior for 5+ years"
              },
              {
                quote: "The community support is incredible. It's so reassuring to connect with others who truly understand.",
                author: "Priya K.",
                role: "Member since 2023"
              },
              {
                quote: "The symptom tracker helped me identify patterns I never noticed before. My doctor was impressed with the data!",
                author: "Alex T.",
                role: "PCOS Health User"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col h-full"
              >
                <div className="text-4xl text-pink-200 mb-4">"</div>
                <p className="text-gray-600 mb-6 flex-grow">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Final CTA */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-10 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your PCOS Journey Today</h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Join {stats.totalUsers.toLocaleString()}+ women who are taking control of their PCOS health
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate && onNavigate('symptoms')}
                className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Started for Free</span>
                <FaArrowRight className="text-sm" />
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('about')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
            <p className="text-pink-100 text-sm mt-6">✨ Free to use • No credit card required • Start immediately</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-pink-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">🌸 PCOS Health</h4>
              <p className="text-sm text-gray-600">
                Empowering women with PCOS through comprehensive health management tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">📞 Support</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📧 support@pcoshealth.com</p>
                <p>💬 24/7 Community Support</p>
                <p>📚 Help Center</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">🔗 Quick Links</h4>
              <div className="space-y-1 text-sm">
                <button 
                  onClick={() => onNavigate && onNavigate('symptoms')}
                  className="block text-pink-600 hover:text-pink-700 transition duration-200"
                >
                  Symptom Tracker
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('resources')}
                  className="block text-blue-600 hover:text-blue-700 transition duration-200"
                >
                  Resources
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('community')}
                  className="block text-purple-600 hover:text-purple-700 transition duration-200"
                >
                  Community
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-200 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © 2024 PCOS Health. Made with ❤️ for women managing PCOS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;