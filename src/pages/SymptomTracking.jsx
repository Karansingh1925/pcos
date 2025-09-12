import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiPlus, FiBarChart2, FiX, FiClock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('SymptomTracking error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <h2 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">We're sorry, but there was an error loading the symptom tracking feature.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const defaultSymptomCategories = {
  'Menstrual': [
    { name: 'Irregular periods', description: 'Inconsistent menstrual cycle length', comment: 'Track if periods are irregular' },
    { name: 'Heavy bleeding', description: 'Excessive blood flow during periods', comment: 'Note if experiencing heavy flow' },
    { name: 'Missed periods', description: 'Absence of menstrual cycle', comment: 'Record any missed periods' },
    { name: 'Painful periods', description: 'Severe menstrual cramps', comment: 'Track severity of period pain' },
    { name: 'Spotting', description: 'Light bleeding between periods', comment: 'Note any unexpected spotting' }
  ],
  'Physical': [
    { name: 'Weight gain', description: 'Unexplained increase in weight', comment: 'Track any unexplained weight changes' },
    { name: 'Difficulty losing weight', description: 'Challenges in reducing body weight', comment: 'Note weight loss challenges' },
    { name: 'Excessive hair growth', description: 'Hirsutism in male-pattern areas', comment: 'Track unusual hair growth' },
    { name: 'Hair loss/thinning', description: 'Male-pattern baldness or thinning', comment: 'Monitor hair thinning patterns' },
    { name: 'Acne', description: 'Persistent skin breakouts', comment: 'Track acne flare-ups' },
    { name: 'Dark skin patches', description: 'Acanthosis nigricans', comment: 'Note any skin discoloration' },
    { name: 'Skin tags', description: 'Small skin growths', comment: 'Track appearance of skin tags' }
  ],
  'Metabolic': [
    { name: 'Fatigue', description: 'Persistent tiredness', comment: 'Track energy levels' },
    { name: 'Sugar cravings', description: 'Intense desire for sweet foods', comment: 'Note sugar cravings intensity' },
    { name: 'Increased appetite', description: 'Heightened hunger', comment: 'Monitor hunger levels' },
    { name: 'Difficulty concentrating', description: 'Brain fog or focus issues', comment: 'Track focus and clarity' },
    { name: 'Mood swings', description: 'Rapid emotional changes', comment: 'Note emotional stability' },
    { name: 'Anxiety', description: 'Feelings of worry or unease', comment: 'Track anxiety levels' },
    { name: 'Depression', description: 'Persistent sadness or hopelessness', comment: 'Monitor mood changes' }
  ],
  'Reproductive': [
    { name: 'Difficulty conceiving', description: 'Trouble getting pregnant', comment: 'Track fertility concerns' },
    { name: 'Pelvic pain', description: 'Discomfort in lower abdomen', comment: 'Note any pelvic discomfort' },
    { name: 'Ovarian cysts', description: 'Fluid-filled sacs on ovaries', comment: 'Monitor cyst-related symptoms' },
    { name: 'Breast tenderness', description: 'Soreness or pain in breasts', comment: 'Track breast pain or changes' }
  ]
};

const severityLevels = [
  { value: 0, label: 'No', color: 'bg-gray-100 hover:bg-gray-200', activeColor: 'bg-gray-300', description: 'No symptoms experienced' },
  { value: 1, label: 'Yes', color: 'bg-green-100 hover:bg-green-200', activeColor: 'bg-green-300', description: 'Symptom is present' }
];

const SymptomTracking = () => {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptoms, setSymptoms] = useState({});
  const [currentSymptoms, setCurrentSymptoms] = useState({});
  const [notes, setNotes] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [savedMessage, setSavedMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newSymptom, setNewSymptom] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [symptomCategories, setSymptomCategories] = useState(defaultSymptomCategories);
  const notesRef = useRef(null);

  // Flatten symptoms for searching
  const allSymptoms = Object.values(symptomCategories).flat();
  const symptomNames = allSymptoms.map(s => s.name);

  // Filtering symptoms
  const filteredSymptoms = allSymptoms.filter(symptom =>
    (activeCategory === 'All' ||
      (symptomCategories[activeCategory] &&
        symptomCategories[activeCategory].some(s => s.name === symptom.name))) &&
    (searchTerm === '' ||
      symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      symptom.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedSymptoms = localStorage.getItem('pcosSymptoms');
      if (savedSymptoms) {
        setSymptoms(JSON.parse(savedSymptoms));
        setShowWelcome(false);
      }
    } catch (error) {
      console.error('Error loading saved symptoms:', error);
    }
  }, []);

  // Load symptoms for selected date
  useEffect(() => {
    const dateSymptoms = symptoms[selectedDate] || {};
    setCurrentSymptoms(dateSymptoms.symptoms || {});
    setNotes(dateSymptoms.notes || '');
  }, [selectedDate, symptoms]);

  // Debounced save to localStorage
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const updatedSymptoms = {
          ...symptoms,
          [selectedDate]: {
            symptoms: currentSymptoms,
            notes,
            timestamp: new Date().toISOString()
          }
        };
        setSymptoms(updatedSymptoms);
        localStorage.setItem('pcosSymptoms', JSON.stringify(updatedSymptoms));
        setSavedMessage('✅ Symptoms saved');
        setTimeout(() => setSavedMessage(''), 2000);
      } catch (error) {
        console.error('Error saving symptoms:', error);
        setSavedMessage('❌ Error saving');
        setTimeout(() => setSavedMessage(''), 2000);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [currentSymptoms, notes, selectedDate]);

  // Sample analytics functions
  const getRecentTrends = () => {
    const dates = Object.keys(symptoms).sort().slice(-7);
    return dates.map(date => ({
      date,
      symptomCount: symptoms[date]?.symptoms ? Object.keys(symptoms[date].symptoms).filter(s => symptoms[date].symptoms[s] > 0).length : 0,
      totalSeverity: symptoms[date]?.symptoms ? Object.values(symptoms[date].symptoms).reduce((sum, severity) => sum + severity, 0) : 0
    }));
  };

  const trends = getRecentTrends();

  const getMostCommonSymptoms = () => {
    const symptomCounts = {};
    Object.values(symptoms).forEach(day => {
      if (day.symptoms) {
        Object.keys(day.symptoms).forEach(symptom => {
          symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
        });
      }
    });
    return Object.entries(symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const commonSymptoms = getMostCommonSymptoms();

  // Handlers
  const handleSymptomChange = (symptom, severity) => {
    setCurrentSymptoms(prev => ({ ...prev, [symptom]: severity }));
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAddSymptom = () => {
    if (newSymptom.trim() && !symptomNames.includes(newSymptom.trim())) {
      const newSymptomObj = { name: newSymptom.trim(), description: 'Custom symptom' };
      setSymptomCategories(prev => ({
        ...prev,
        'Custom': [...(prev['Custom'] || []), newSymptomObj]
      }));
      setNewSymptom('');
      setShowQuickAdd(false);
      setActiveCategory('Custom');
    }
  };

  // Utility function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date).toDateString() === today.toDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
        >
          <FiArrowLeft className="mr-1" /> Back to Home
        </Link>
      </div>
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Symptom Tracker</h2>
            <p className="text-gray-600 mb-6">Track your PCOS symptoms to identify patterns and triggers over time.</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setShowWelcome(false)}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Message */}
      {savedMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          {savedMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Symptom Tracker</h1>
              <p className="text-gray-600">Track and monitor your PCOS symptoms</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                max={new Date().toISOString().split('T')[0]}
              />
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition-colors"
              >
                <FiBarChart2 />
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </button>
            </div>
          </div>
        </div>

        {/* Analytics View */}
        {showAnalytics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Symptom Frequency</h2>
              <div className="space-y-3">
                {commonSymptoms.map(([symptom, count]) => (
                  <div key={symptom} className="flex items-center justify-between">
                    <span className="text-gray-700">{symptom}</span>
                    <span className="text-sm text-gray-500">{count} days</span>
                  </div>
                ))}
                {commonSymptoms.length === 0 && (
                  <p className="text-gray-500 text-sm">No symptom data available yet.</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {trends.length > 0 ? (
                  trends.map(({ date, symptomCount }) => (
                    <div key={date} className="flex items-center justify-between">
                      <span className="text-gray-700">{new Date(date).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-500">{symptomCount} symptoms</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent activity to show.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Symptom Tracking View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Symptom List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Search symptoms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent w-full sm:w-auto"
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {Object.keys(symptomCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowQuickAdd(true)}
                      className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-2 rounded-lg text-sm hover:bg-pink-200 transition-colors whitespace-nowrap"
                    >
                      <FiPlus size={16} />
                      <span className="hidden sm:inline">Add Symptom</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map((symptom) => (
                      <div key={symptom.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{symptom.name}</h3>
                            <p className="text-sm text-gray-600">{symptom.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSymptomChange(symptom.name, currentSymptoms[symptom.name] ? 0 : 1)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors w-20 ${
                                currentSymptoms[symptom.name] 
                                  ? 'bg-green-500 text-white hover:bg-green-600' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {currentSymptoms[symptom.name] ? 'Yes' : 'No'}
                            </button>
                            <span className="text-sm text-gray-500">
                              {symptom.comment}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">No symptoms found. Try adjusting your search or category.</div>
                  )}
                </div>
              </div>
            </div>
            {/* Notes Section */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Daily Notes</h2>
                <textarea
                  ref={notesRef}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Add any notes about your symptoms, mood, or other observations..."
                  value={notes}
                  onChange={handleNotesChange}
                />
                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  <span>Your notes are automatically saved</span>
                  <span>{notes.length}/1000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Add Symptom Modal */}
        {showQuickAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Custom Symptom</h3>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    setNewSymptom('');
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="symptom-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Symptom Name
                  </label>
                  <input
                    type="text"
                    id="symptom-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    placeholder="E.g., Headache, Nausea, etc."
                    autoFocus
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickAdd(false);
                      setNewSymptom('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddSymptom}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    disabled={!newSymptom.trim()}
                  >
                    Add Symptom
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SymptomTrackingWithErrorBoundary = () => (
  <ErrorBoundary>
    <SymptomTracking />
  </ErrorBoundary>
);

export default SymptomTrackingWithErrorBoundary;

// Add animation styles only once
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
  }

  .symptom-item {
    transition: all 0.2s ease;
  }

  .symptom-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .severity-dot {
    transition: transform 0.2s ease;
  }

  .severity-dot:hover {
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    .severity-levels {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('symptom-tracking-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.id = 'symptom-tracking-styles';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
