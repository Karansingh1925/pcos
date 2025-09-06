import React, { useState, useEffect } from 'react';

const Home = ({ onNavigate }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [stats, setStats] = useState({
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Welcome Message for First-time Users */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300 rounded-lg p-6 mx-4 mt-8 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-pink-700 text-lg">🌸</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to PCOS Health! 🎉</h3>
              <p className="text-gray-700 mb-4">
                You've taken the first step towards better PCOS management. Our platform offers comprehensive tools 
                for symptom tracking, educational resources, and community support - all designed specifically for women with PCOS.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition duration-200"
                >
                  Let's Get Started!
                </button>
                <button
                  onClick={() => { setShowWelcome(false); onNavigate && onNavigate('symptoms'); }}
                  className="bg-white text-pink-600 border border-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-50 transition duration-200"
                >
                  Start Tracking Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🌸</span>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-pink-600">PCOS Health</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your comprehensive platform for managing PCOS symptoms, tracking health metrics, 
            and connecting with healthcare professionals specialized in women's health.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-pink-200">
              <div className="text-2xl font-bold text-pink-600">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">👥 Active Users</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{stats.symptomsTracked.toLocaleString()}</div>
              <div className="text-sm text-gray-600">📊 Symptoms Tracked</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{stats.resourcesAccessed.toLocaleString()}</div>
              <div className="text-sm text-gray-600">📚 Resources Accessed</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{stats.communityPosts.toLocaleString()}</div>
              <div className="text-sm text-gray-600">💬 Community Posts</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer hover:bg-pink-50 border-2 border-transparent hover:border-pink-200 group"
            onClick={() => onNavigate && onNavigate('symptoms')}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-semibold text-black-600 mb-4 text-center group-hover:text-pink-700 transition duration-300">Symptom Tracking</h3>
            <p className="text-gray-600 text-center mb-4">
              Monitor your PCOS symptoms, menstrual cycles, and health patterns with our intuitive tracking tools.
            </p>
            <div className="text-center">
              <span className="inline-flex items-center text-pink-600 text-sm font-medium group-hover:text-pink-700">
                Click to start tracking
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 group"
            onClick={() => onNavigate && onNavigate('resources')}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition duration-300">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-2xl font-semibold text-black-600 mb-4 text-center group-hover:text-blue-700 transition duration-300">Educational Resources</h3>
            <p className="text-gray-600 text-center mb-4">
              Access evidence-based information about PCOS management, nutrition, and lifestyle modifications.
            </p>
            <div className="text-center">
              <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                Explore resources
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer hover:bg-purple-50 border-2 border-transparent hover:border-purple-200 group"
            onClick={() => onNavigate && onNavigate('community')}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition duration-300">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4 text-center group-hover:text-purple-700 transition duration-300">Community Support</h3>
            <p className="text-gray-600 text-center mb-4">
              Connect with other women managing PCOS and share experiences in a supportive environment.
            </p>
            <div className="text-center">
              <span className="inline-flex items-center text-black-600 text-sm font-medium group-hover:text-purple-700">
                Join community
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-pink-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">✨ Why Choose PCOS Health?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Personalized Tracking</h4>
              <p className="text-sm text-gray-600">Tailored to your unique PCOS journey</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔬</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Evidence-Based</h4>
              <p className="text-sm text-gray-600">Backed by medical research</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">👩‍⚕️</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Expert Approved</h4>
              <p className="text-sm text-gray-600">Reviewed by PCOS specialists</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔒</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Privacy First</h4>
              <p className="text-sm text-gray-600">Your data stays secure</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Take Control of Your Health? 💪</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join <span className="font-semibold text-pink-600">{stats.totalUsers.toLocaleString()}+</span> women who are successfully managing their PCOS with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onNavigate && onNavigate('symptoms')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🚀 Start Tracking Now
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('resources')}
              className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 shadow-lg hover:shadow-xl"
            >
              📖 Learn More
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">✨ Free to use • No credit card required • Start immediately</p>
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