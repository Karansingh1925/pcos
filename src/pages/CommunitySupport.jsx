import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const CommunitySupport = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [showWelcome, setShowWelcome] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [posts, setPosts] = useState([]);

  // Sample community data
  const communityStats = {
    totalMembers: 12847,
    activeToday: 234,
    postsToday: 45,
    supportGiven: 1892
  };

  const categories = [
    { id: 'general', name: 'General Discussion', icon: '💬', color: 'bg-blue-100 text-blue-700' },
    { id: 'symptoms', name: 'Symptom Management', icon: '🩺', color: 'bg-green-100 text-green-700' },
    { id: 'nutrition', name: 'Nutrition & Diet', icon: '🥗', color: 'bg-orange-100 text-orange-700' },
    { id: 'exercise', name: 'Exercise & Fitness', icon: '💪', color: 'bg-purple-100 text-purple-700' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠', color: 'bg-pink-100 text-pink-700' },
    { id: 'success', name: 'Success Stories', icon: '🌟', color: 'bg-yellow-100 text-yellow-700' }
  ];

  const samplePosts = [
    {
      id: 1,
      title: "Finally found a workout routine that works for me!",
      content: "After months of trying different exercises, I discovered that low-impact strength training combined with yoga has been amazing for managing my PCOS symptoms...",
      author: "Sarah M.",
      category: 'exercise',
      replies: 23,
      likes: 45,
      timeAgo: '2 hours ago',
      isHelpful: true
    },
    {
      id: 2,
      title: "Question about metformin side effects",
      content: "I just started metformin and experiencing some digestive issues. Is this normal? How long did it take for your body to adjust?",
      author: "Emma K.",
      category: 'symptoms',
      replies: 18,
      likes: 12,
      timeAgo: '4 hours ago',
      isHelpful: false
    },
    {
      id: 3,
      title: "Anti-inflammatory meal prep ideas?",
      content: "Looking for some easy meal prep recipes that are anti-inflammatory and PCOS-friendly. What are your go-to meals?",
      author: "Lisa R.",
      category: 'nutrition',
      replies: 31,
      likes: 67,
      timeAgo: '6 hours ago',
      isHelpful: true
    }
  ];

  useEffect(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(samplePosts);
      setShowWelcome(true);
    }
  }, []);

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        ...newPost,
        author: 'You',
        replies: 0,
        likes: 0,
        timeAgo: 'Just now',
        isHelpful: false
      };
      
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
      
      setNewPost({ title: '', content: '', category: 'general' });
      setSavedMessage('✅ Post created successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <FiArrowLeft className="mr-1" /> Back to Home
          </Link>
        </div>
        {showWelcome && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">👋</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Our Community!</h3>
                <p className="text-gray-600 mb-4">
                  Connect with thousands of women managing PCOS. Share experiences, ask questions, and support each other 
                  on this journey. Remember to be kind, respectful, and supportive.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-200"
                  >
                    Join the Conversation
                  </button>
                  <button
                    onClick={() => { setShowWelcome(false); setActiveTab('guidelines'); }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition duration-200"
                  >
                    Community Guidelines
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
              <h1 className="text-3xl font-bold text-purple-600 mb-2 flex items-center gap-2">
                🤝 Community Support
              </h1>
              <p className="text-gray-600">Connect, share, and support each other in managing PCOS together</p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-blue-600">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Members</div>
              </div>
              <div className="text-xl">👥</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-green-600">{communityStats.activeToday}</div>
                <div className="text-xs text-gray-600">Active Today</div>
              </div>
              <div className="text-xl">🟢</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-orange-600">{communityStats.postsToday}</div>
                <div className="text-xs text-gray-600">Posts Today</div>
              </div>
              <div className="text-xl">📝</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-pink-600">{communityStats.supportGiven}</div>
                <div className="text-xs text-gray-600">Support Given</div>
              </div>
              <div className="text-xl">❤️</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'discussions', name: 'Discussions', icon: '💬' },
              { id: 'create', name: 'Create Post', icon: '✍️' },
              { id: 'resources', name: 'Resources', icon: '📚' },
              { id: 'guidelines', name: 'Guidelines', icon: '📋' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium flex items-center space-x-2 transition duration-200 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div>
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Browse by Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`px-3 py-2 rounded-full text-xs font-medium transition duration-200 ${category.color} hover:shadow-sm`}
                      >
                        <span className="mr-1">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              categories.find(c => c.id === post.category)?.color || 'bg-gray-100 text-gray-700'
                            }`}>
                              {categories.find(c => c.id === post.category)?.icon} {categories.find(c => c.id === post.category)?.name}
                            </span>
                            {post.isHelpful && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                ✅ Helpful
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>By {post.author}</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 transition duration-200"
                          >
                            <span>❤️</span>
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition duration-200">
                            <span>💬</span>
                            <span className="text-sm">{post.replies} replies</span>
                          </button>
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Post Tab */}
            {activeTab === 'create' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✍️ Share Your Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="What would you like to discuss?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Share your experience, ask a question, or offer support..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button
                    onClick={handleCreatePost}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-200"
                  >
                    Post to Community
                  </button>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Community Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">🆘 Crisis Support</h4>
                    <p className="text-blue-700 text-sm mb-3">If you're experiencing a mental health crisis, please reach out for immediate help.</p>
                    <div className="space-y-1 text-sm">
                      <div>National Suicide Prevention Lifeline: 988</div>
                      <div>Crisis Text Line: Text HOME to 741741</div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">🩺 Professional Help</h4>
                    <p className="text-green-700 text-sm mb-3">Find healthcare providers who specialize in PCOS treatment.</p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Find Specialists →
                    </button>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">📖 Educational Materials</h4>
                    <p className="text-purple-700 text-sm mb-3">Access evidence-based information about PCOS management.</p>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Browse Resources →
                    </button>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-900 mb-2">🤝 Support Groups</h4>
                    <p className="text-pink-700 text-sm mb-3">Join local or online support groups for ongoing community.</p>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      Find Groups →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Guidelines Tab */}
            {activeTab === 'guidelines' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Community Guidelines</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Do</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Be respectful and supportive</li>
                      <li>• Share your experiences honestly</li>
                      <li>• Ask questions - no question is too small</li>
                      <li>• Celebrate others' successes</li>
                      <li>• Use content warnings for sensitive topics</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">❌ Don't</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Give specific medical advice</li>
                      <li>• Share personal medical information of others</li>
                      <li>• Promote unproven treatments or products</li>
                      <li>• Use discriminatory language</li>
                      <li>• Share graphic medical images</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Remember</h4>
                    <p className="text-yellow-700 text-sm">
                      This community provides peer support, not medical advice. Always consult with healthcare 
                      professionals for medical decisions. If you're in crisis, please seek immediate professional help.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;