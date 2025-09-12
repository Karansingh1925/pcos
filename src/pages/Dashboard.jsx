import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartLine, FaBook, FaUsers, FaHeartbeat, FaCalendarAlt, FaRegBell, FaRegCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ value, label, icon: Icon, color, change }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        {change && (
          <span className={`inline-flex items-center text-sm font-medium mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last week
          </span>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color.bg} text-white`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, title, description, to, color }) => (
  <Link 
    to={to}
    className="group block p-6 bg-white rounded-xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all"
  >
    <div className="flex items-start">
      <div className={`p-3 rounded-lg ${color.bg} ${color.text} group-hover:scale-110 transition-transform`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-600 transition-colors">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ title, time, description, icon: Icon, color }) => (
  <div className="flex items-start pb-4 last:pb-0">
    <div className={`p-2 rounded-lg ${color.bg} ${color.text} mt-1`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // In a real app, you would fetch the user data here
    setUser({
      name: 'Sarah',
      lastLogin: new Date().toLocaleDateString()
    });
  }, []);
  
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };
  const stats = [
    { value: '14', label: 'Symptom-Free Days', change: 5, icon: FaHeartbeat, color: { bg: 'bg-pink-500', text: 'text-white' } },
    { value: '8', label: 'Community Posts', change: 3, icon: FaUsers, color: { bg: 'bg-blue-500', text: 'text-white' } },
    { value: '12', label: 'Resources Viewed', change: -2, icon: FaBook, color: { bg: 'bg-purple-500', text: 'text-white' } },
    { value: '5', label: 'Upcoming Appointments', change: 1, icon: FaCalendarAlt, color: { bg: 'bg-green-500', text: 'text-white' } },
  ];

  const quickActions = [
    {
      title: 'Log Symptoms',
      description: 'Record how you\'re feeling today',
      to: '/symptoms',
      icon: FaHeartbeat,
      color: { bg: 'bg-pink-100', text: 'text-pink-600' }
    },
    {
      title: 'Community Post',
      description: 'Share your experience',
      to: '/community',
      icon: FaUsers,
      color: { bg: 'bg-blue-100', text: 'text-blue-600' }
    },
    {
      title: 'Educational Resources',
      description: 'Latest PCOS research',
      to: '/resources',
      icon: FaBook,
      color: { bg: 'bg-purple-100', text: 'text-purple-600' }
    },
    {
      title: 'Set Reminder',
      description: 'Medication or appointment',
      to: '/reminders',
      icon: FaRegBell,
      color: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
    },
  ];

  const recentActivity = [
    {
      title: 'New symptom logged',
      time: '2h ago',
      description: 'You recorded your daily symptoms',
      icon: FaHeartbeat,
      color: { bg: 'bg-pink-100', text: 'text-pink-600' }
    },
    {
      title: 'Community response',
      time: '5h ago',
      description: 'Sarah replied to your post about diet tips',
      icon: FaRegCommentDots,
      color: { bg: 'bg-blue-100', text: 'text-blue-600' }
    },
    {
      title: 'Article published',
      time: '1d ago',
      description: 'New article: "PCOS and Nutrition" is now available',
      icon: FaBook,
      color: { bg: 'bg-purple-100', text: 'text-purple-600' }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to PCOS 👋
            </h1>
          </div>
          <div className="mt-4 md:mt-0">
            {/* Buttons removed as requested */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuickAction {...action} />
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <button className="text-sm font-medium text-pink-600 hover:text-pink-700">View all</button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ActivityItem {...activity} />
                    {index < recentActivity.length - 1 && <hr className="my-4 border-gray-100" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Health Overview</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Cycle Tracker</h3>
                <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">Day 12</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Next period in 2 days</p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Water Intake</span>
                    <span className="text-sm font-medium">5/8 cups</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Sleep</span>
                    <span className="text-sm font-medium">7h 12m</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Activity</span>
                    <span className="text-sm font-medium">4,532 steps</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Reminders */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
              <h3 className="font-medium text-gray-900 mb-3">Daily Tip</h3>
              <p className="text-sm text-gray-600 mb-4">
                Staying hydrated can help manage bloating and fatigue. Aim for 8-10 glasses of water today!
              </p>
              <button className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center">
                Read more tips
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-500 hover:text-pink-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-pink-600 transition-colors">
                Contact
              </Link>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PCOS Care. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
