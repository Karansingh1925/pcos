import React, { useState, useEffect } from 'react';

const SymptomTracking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptoms, setSymptoms] = useState({});
  const [currentSymptoms, setCurrentSymptoms] = useState({});
  const [notes, setNotes] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // PCOS-specific symptoms with severity levels
  const symptomCategories = {
    'Menstrual Symptoms': [
      'Irregular periods',
      'Heavy bleeding',
      'Missed periods',
      'Painful periods',
      'Spotting'
    ],
    'Physical Symptoms': [
      'Weight gain',
      'Difficulty losing weight',
      'Excessive hair growth (hirsutism)',
      'Hair loss/thinning',
      'Acne',
      'Dark skin patches',
      'Skin tags'
    ],
    'Metabolic Symptoms': [
      'Fatigue',
      'Sugar cravings',
      'Increased appetite',
      'Difficulty concentrating',
      'Mood swings',
      'Anxiety',
      'Depression'
    ],
    'Reproductive Symptoms': [
      'Difficulty conceiving',
      'Pelvic pain',
      'Ovarian cysts',
      'Breast tenderness'
    ]
  };

  const severityLevels = [
    { value: 0, label: 'None', color: 'bg-gray-200', icon: '⚪', description: 'No symptoms experienced' },
    { value: 1, label: 'Mild', color: 'bg-green-200', icon: '🟢', description: 'Barely noticeable symptoms' },
    { value: 2, label: 'Moderate', color: 'bg-yellow-200', icon: '🟡', description: 'Noticeable but manageable' },
    { value: 3, label: 'Severe', color: 'bg-orange-200', icon: '🟠', description: 'Significantly impacts daily life' },
    { value: 4, label: 'Very Severe', color: 'bg-red-200', icon: '🔴', description: 'Severely impacts daily activities' }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('pcosSymptoms');
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    } else {
      // Show welcome message for first-time users
      setShowWelcome(true);
    }
  }, []);

  // Load symptoms for selected date
  useEffect(() => {
    const dateSymptoms = symptoms[selectedDate] || {};
    setCurrentSymptoms(dateSymptoms.symptoms || {});
    setNotes(dateSymptoms.notes || '');
  }, [selectedDate, symptoms]);

  // Save symptoms to localStorage
  const saveSymptoms = (newSymptoms, newNotes) => {
    const updatedSymptoms = {
      ...symptoms,
      [selectedDate]: {
        symptoms: newSymptoms,
        notes: newNotes,
        timestamp: new Date().toISOString()
      }
    };
    setSymptoms(updatedSymptoms);
    localStorage.setItem('pcosSymptoms', JSON.stringify(updatedSymptoms));
    
    // Show save confirmation
    setSavedMessage('✅ Symptoms saved successfully!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  // Handle symptom severity change
  const handleSymptomChange = (symptom, severity) => {
    const newSymptoms = { ...currentSymptoms, [symptom]: severity };
    setCurrentSymptoms(newSymptoms);
    saveSymptoms(newSymptoms, notes);
  };

  // Handle notes change
  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
    saveSymptoms(currentSymptoms, newNotes);
  };

  // Get symptom statistics
  const getSymptomStats = () => {
    const allDates = Object.keys(symptoms);
    const stats = {};
    
    Object.values(symptomCategories).flat().forEach(symptom => {
      const occurrences = allDates.filter(date => 
        symptoms[date].symptoms[symptom] > 0
      ).length;
      const totalSeverity = allDates.reduce((sum, date) => 
        sum + (symptoms[date].symptoms[symptom] || 0), 0
      );
      const avgSeverity = allDates.length > 0 ? totalSeverity / allDates.length : 0;
      
      stats[symptom] = {
        frequency: allDates.length > 0 ? (occurrences / allDates.length * 100) : 0,
        averageSeverity: avgSeverity
      };
    });
    
    return stats;
  };

  // Get recent trends (last 7 days)
  const getRecentTrends = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }
    
    return last7Days.map(date => ({
      date,
      totalSeverity: Object.values(symptoms[date]?.symptoms || {}).reduce((sum, val) => sum + val, 0),
      symptomCount: Object.values(symptoms[date]?.symptoms || {}).filter(val => val > 0).length
    }));
  };

  const stats = getSymptomStats();
  const trends = getRecentTrends();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Welcome Message for First-time Users */}
        {showWelcome && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-lg">👋</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Symptom Tracking!</h3>
                <p className="text-gray-600 mb-4">
                  Track your PCOS symptoms daily to identify patterns and triggers. Rate each symptom from None to Very Severe, 
                  and add notes about what might have influenced your symptoms today.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition duration-200"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => { setShowWelcome(false); setShowAnalytics(true); }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition duration-200"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Message */}
        {savedMessage && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            {savedMessage}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 
                className="text-3xl font-bold text-pink-600 mb-2 cursor-pointer hover:text-pink-800 transition duration-200 select-none inline-flex items-center gap-2"
                onClick={() => setShowAnalytics(!showAnalytics)}
                title="Click to toggle analytics"
              >
                📊 Symptom Tracking
                <span className="text-sm bg-pink-100 px-2 py-1 rounded-full">
                  {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                </span>
              </h1>
              <p className="text-gray-600">Monitor your PCOS symptoms to better understand patterns and triggers. Click the title to toggle analytics.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tracking Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Date Selection */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📅 Select Date to Track
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 mb-2 sm:mb-0"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                      className="px-3 py-2 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium hover:bg-pink-200 transition duration-200"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        setSelectedDate(yesterday.toISOString().split('T')[0]);
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200"
                    >
                      Yesterday
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Track symptoms daily for the most accurate patterns
                </p>
              </div>

              {/* Symptom Categories */}
              {Object.entries(symptomCategories).map(([category, categorySymptoms]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {categorySymptoms.map(symptom => (
                      <div key={symptom} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-3 sm:mb-0 sm:w-1/2">
                            <span className="text-gray-800 font-medium">{symptom}</span>
                            {currentSymptoms[symptom] > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Current: {severityLevels[currentSymptoms[symptom]]?.label} {severityLevels[currentSymptoms[symptom]]?.icon}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {severityLevels.map(level => (
                              <button
                                key={level.value}
                                onClick={() => handleSymptomChange(symptom, level.value)}
                                title={level.description}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition duration-200 flex items-center space-x-1 ${
                                  currentSymptoms[symptom] === level.value
                                    ? `${level.color} ring-2 ring-pink-500 shadow-md`
                                    : `${level.color} hover:ring-2 hover:ring-pink-300 hover:shadow-sm`
                                }`}
                              >
                                <span>{level.icon}</span>
                                <span>{level.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Notes Section */}
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Daily Notes & Observations
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="What might have triggered your symptoms today? Note medications, stress levels, diet, exercise, sleep quality, or anything else relevant..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                />
                <div className="mt-2 text-xs text-gray-500">
                  💡 Helpful to track: Sleep (hours), stress level (1-10), medications, diet changes, exercise, mood
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          {showAnalytics && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
                
                {/* Recent Trends */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                    📈 7-Day Trend
                  </h4>
                  {trends.every(day => day.symptomCount === 0) ? (
                    <div className="text-center py-4 text-gray-500">
                      <div className="text-2xl mb-2">🌟</div>
                      <p className="text-sm">No symptoms tracked yet</p>
                      <p className="text-xs">Start tracking to see your trends!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {trends.map(day => (
                        <div key={day.date} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-gray-600 font-medium">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 text-xs">{day.symptomCount} symptoms</span>
                            <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  day.totalSeverity === 0 ? 'bg-green-400' :
                                  day.totalSeverity <= 5 ? 'bg-yellow-400' :
                                  day.totalSeverity <= 10 ? 'bg-orange-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${Math.min(day.totalSeverity * 8, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs">
                              {day.totalSeverity === 0 ? '😊' :
                               day.totalSeverity <= 5 ? '😐' :
                               day.totalSeverity <= 10 ? '😟' : '😰'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Top Symptoms */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Most Frequent Symptoms</h4>
                  <div className="space-y-2">
                    {Object.entries(stats)
                      .sort(([,a], [,b]) => b.frequency - a.frequency)
                      .slice(0, 5)
                      .map(([symptom, data]) => (
                        <div key={symptom} className="text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 truncate">{symptom}</span>
                            <span className="text-gray-500">{data.frequency.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-pink-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${data.frequency}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-sm p-4 border border-pink-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-pink-600">
                  {Object.keys(symptoms).length}
                </div>
                <div className="text-sm text-gray-600">Days Tracked</div>
              </div>
              <div className="text-2xl">📅</div>
            </div>
            {Object.keys(symptoms).length === 0 && (
              <div className="text-xs text-gray-500 mt-2">Start tracking today!</div>
            )}
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(currentSymptoms).filter(val => val > 0).length}
                </div>
                <div className="text-sm text-gray-600">Symptoms Today</div>
              </div>
              <div className="text-2xl">
                {Object.values(currentSymptoms).filter(val => val > 0).length === 0 ? '😊' : 
                 Object.values(currentSymptoms).filter(val => val > 2).length > 0 ? '😰' : '😐'}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {trends.length > 0 ? Math.round(trends.reduce((sum, day) => sum + day.totalSeverity, 0) / trends.length) : 0}
                </div>
                <div className="text-sm text-gray-600">Avg Weekly Severity</div>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {Object.keys(symptoms).length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Tracking Progress</h4>
              <span className="text-xs text-gray-500">{Object.keys(symptoms).length} days logged</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((Object.keys(symptoms).length / 30) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Object.keys(symptoms).length < 7 ? 'Keep going! Track for 7 days to see trends' :
               Object.keys(symptoms).length < 30 ? 'Great progress! 30 days gives the best insights' :
               'Excellent! You have comprehensive tracking data'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomTracking;