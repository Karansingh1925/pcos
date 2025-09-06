import React, { useState, useEffect } from 'react';

const EducationalResources = () => {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [showWelcome, setShowWelcome] = useState(false);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const categories = [
    { id: 'overview', name: 'PCOS Overview', icon: '📋', color: 'bg-blue-100 text-blue-700' },
    { id: 'symptoms', name: 'Symptoms & Diagnosis', icon: '🩺', color: 'bg-green-100 text-green-700' },
    { id: 'nutrition', name: 'Nutrition & Diet', icon: '🥗', color: 'bg-orange-100 text-orange-700' },
    { id: 'exercise', name: 'Exercise & Fitness', icon: '💪', color: 'bg-purple-100 text-purple-700' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠', color: 'bg-pink-100 text-pink-700' },
    { id: 'treatments', name: 'Treatments', icon: '💊', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'fertility', name: 'Fertility & Pregnancy', icon: '🤱', color: 'bg-rose-100 text-rose-700' },
    { id: 'lifestyle', name: 'Lifestyle Management', icon: '🌱', color: 'bg-emerald-100 text-emerald-700' }
  ];

  const resources = {
    overview: [
      {
        id: 1,
        title: "What is PCOS? Complete Guide",
        type: "Article",
        duration: "10 min read",
        difficulty: "Beginner",
        description: "A comprehensive introduction to Polycystic Ovary Syndrome, covering causes, prevalence, and basic understanding.",
        tags: ["basics", "introduction", "causes"],
        isBookmarked: false,
        rating: 4.8,
        views: 15420
      },
      {
        id: 2,
        title: "PCOS Types and Variations",
        type: "Video",
        duration: "15 min",
        difficulty: "Intermediate",
        description: "Understanding the different types of PCOS and how they affect treatment approaches.",
        tags: ["types", "diagnosis", "treatment"],
        isBookmarked: false,
        rating: 4.6,
        views: 8930
      },
      {
        id: 3,
        title: "PCOS Statistics and Research",
        type: "Infographic",
        duration: "5 min",
        difficulty: "Beginner",
        description: "Latest statistics and research findings about PCOS prevalence and impact.",
        tags: ["statistics", "research", "prevalence"],
        isBookmarked: false,
        rating: 4.7,
        views: 12100
      }
    ],
    symptoms: [
      {
        id: 4,
        title: "Recognizing PCOS Symptoms",
        type: "Interactive Guide",
        duration: "20 min",
        difficulty: "Beginner",
        description: "Interactive tool to help identify and understand common PCOS symptoms.",
        tags: ["symptoms", "diagnosis", "self-assessment"],
        isBookmarked: false,
        rating: 4.9,
        views: 22340
      },
      {
        id: 5,
        title: "Hormonal Imbalances in PCOS",
        type: "Article",
        duration: "12 min read",
        difficulty: "Advanced",
        description: "Deep dive into the hormonal mechanisms behind PCOS symptoms.",
        tags: ["hormones", "science", "mechanisms"],
        isBookmarked: false,
        rating: 4.5,
        views: 7650
      }
    ],
    nutrition: [
      {
        id: 6,
        title: "PCOS-Friendly Meal Planning",
        type: "Guide + Recipes",
        duration: "30 min",
        difficulty: "Beginner",
        description: "Complete meal planning guide with 50+ PCOS-friendly recipes and shopping lists.",
        tags: ["meal-planning", "recipes", "shopping"],
        isBookmarked: false,
        rating: 4.9,
        views: 31200
      },
      {
        id: 7,
        title: "Anti-Inflammatory Foods for PCOS",
        type: "Video Series",
        duration: "45 min",
        difficulty: "Intermediate",
        description: "Learn about anti-inflammatory foods and their role in managing PCOS symptoms.",
        tags: ["anti-inflammatory", "foods", "inflammation"],
        isBookmarked: false,
        rating: 4.7,
        views: 18900
      }
    ],
    exercise: [
      {
        id: 8,
        title: "PCOS Exercise Guidelines",
        type: "Workout Plan",
        duration: "60 min",
        difficulty: "Beginner",
        description: "Evidence-based exercise recommendations specifically designed for women with PCOS.",
        tags: ["exercise", "workout", "guidelines"],
        isBookmarked: false,
        rating: 4.8,
        views: 25600
      }
    ],
    "mental-health": [
      {
        id: 9,
        title: "Managing PCOS-Related Anxiety",
        type: "Article + Audio",
        duration: "15 min",
        difficulty: "Intermediate",
        description: "Strategies for managing anxiety and depression commonly associated with PCOS.",
        tags: ["anxiety", "depression", "mental-health"],
        isBookmarked: false,
        rating: 4.6,
        views: 14300
      }
    ],
    treatments: [
      {
        id: 10,
        title: "PCOS Treatment Options Overview",
        type: "Medical Guide",
        duration: "25 min read",
        difficulty: "Intermediate",
        description: "Comprehensive overview of medical treatments, medications, and therapies for PCOS.",
        tags: ["treatments", "medications", "therapy"],
        isBookmarked: false,
        rating: 4.7,
        views: 19800
      }
    ],
    fertility: [
      {
        id: 11,
        title: "PCOS and Fertility: What You Need to Know",
        type: "Expert Interview",
        duration: "40 min",
        difficulty: "Intermediate",
        description: "Fertility specialist discusses PCOS impact on conception and pregnancy.",
        tags: ["fertility", "pregnancy", "conception"],
        isBookmarked: false,
        rating: 4.8,
        views: 16700
      }
    ],
    lifestyle: [
      {
        id: 12,
        title: "Daily Routines for PCOS Management",
        type: "Lifestyle Guide",
        duration: "20 min",
        difficulty: "Beginner",
        description: "Practical daily routines and habits that support PCOS management.",
        tags: ["lifestyle", "routines", "habits"],
        isBookmarked: false,
        rating: 4.6,
        views: 13400
      }
    ]
  };

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedResources');
    if (savedBookmarks) {
      setBookmarkedResources(JSON.parse(savedBookmarks));
    } else {
      setShowWelcome(true);
    }
  }, []);

  const handleBookmark = (resourceId) => {
    const isCurrentlyBookmarked = bookmarkedResources.includes(resourceId);
    let updatedBookmarks;
    
    if (isCurrentlyBookmarked) {
      updatedBookmarks = bookmarkedResources.filter(id => id !== resourceId);
      setSavedMessage('📚 Removed from bookmarks');
    } else {
      updatedBookmarks = [...bookmarkedResources, resourceId];
      setSavedMessage('⭐ Added to bookmarks');
    }
    
    setBookmarkedResources(updatedBookmarks);
    localStorage.setItem('bookmarkedResources', JSON.stringify(updatedBookmarks));
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const filteredResources = resources[activeCategory]?.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Article': return '📄';
      case 'Video': return '🎥';
      case 'Video Series': return '📺';
      case 'Interactive Guide': return '🎯';
      case 'Infographic': return '📊';
      case 'Guide + Recipes': return '👩‍🍳';
      case 'Workout Plan': return '🏋️‍♀️';
      case 'Article + Audio': return '🎧';
      case 'Medical Guide': return '⚕️';
      case 'Expert Interview': return '🎤';
      case 'Lifestyle Guide': return '📝';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📚</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Educational Resources!</h3>
                <p className="text-gray-600 mb-4">
                  Access evidence-based information about PCOS management, treatment options, and lifestyle strategies. 
                  Bookmark resources for easy access and track your learning progress.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Start Learning
                  </button>
                  <button
                    onClick={() => { setShowWelcome(false); setActiveCategory('overview'); }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition duration-200"
                  >
                    PCOS Basics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation */}
        {savedMessage && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            {savedMessage}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2 flex items-center gap-2">
                📚 Educational Resources
              </h1>
              <p className="text-gray-600">Evidence-based information to help you understand and manage PCOS</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title, description, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {Object.values(resources).flat().length}
                </div>
                <div className="text-xs text-gray-600">Total Resources</div>
              </div>
              <div className="text-xl">📋</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-green-600">{bookmarkedResources.length}</div>
                <div className="text-xs text-gray-600">Bookmarked</div>
              </div>
              <div className="text-xl">⭐</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-xs text-gray-600">Categories</div>
              </div>
              <div className="text-xl">🏷️</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-orange-600">
                  {Math.round(Object.values(resources).flat().reduce((sum, r) => sum + r.rating, 0) / Object.values(resources).flat().length * 10) / 10}
                </div>
                <div className="text-xs text-gray-600">Avg Rating</div>
              </div>
              <div className="text-xl">⭐</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">📂 Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center space-x-2 ${
                      activeCategory === category.id
                        ? `${category.color} shadow-sm`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {resources[category.id]?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <span>{categories.find(c => c.id === activeCategory)?.icon}</span>
                  <span>{categories.find(c => c.id === activeCategory)?.name}</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
                </span>
              </div>

              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-500">Try adjusting your search or browse other categories</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredResources.map(resource => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm text-gray-500">{resource.type}</span>
                                <span className="text-sm text-gray-500">⏱️ {resource.duration}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                                  {resource.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {resource.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>⭐ {resource.rating}</span>
                              <span>👁️ {resource.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleBookmark(resource.id)}
                          className={`ml-4 p-2 rounded-lg transition duration-200 ${
                            bookmarkedResources.includes(resource.id)
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                          }`}
                        >
                          {bookmarkedResources.includes(resource.id) ? '⭐' : '☆'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex space-x-3">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200">
                            Access Resource
                          </button>
                          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200">
                            Preview
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <button className="hover:text-blue-600 transition duration-200">Share</button>
                          <span>•</span>
                          <button className="hover:text-blue-600 transition duration-200">Report</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;