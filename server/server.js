import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const RESOURCES_FILE = path.join(DATA_DIR, 'resources.json');
const BOOKMARKS_FILE = path.join(DATA_DIR, 'bookmarks.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Initialize data files
async function initializeDataFiles() {
  await ensureDataDir();
  
  // Initialize posts file
  try {
    await fs.access(POSTS_FILE);
  } catch {
    const initialPosts = [
      {
        id: uuidv4(),
        title: "Finally found a workout routine that works for me!",
        content: "After months of trying different exercises, I discovered that low-impact strength training combined with yoga has been amazing for managing my PCOS symptoms...",
        author: "Sarah M.",
        category: 'exercise',
        replies: 23,
        likes: 45,
        timeAgo: '2 hours ago',
        isHelpful: true,
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Question about metformin side effects",
        content: "I just started metformin and experiencing some digestive issues. Is this normal? How long did it take for your body to adjust?",
        author: "Emma K.",
        category: 'symptoms',
        replies: 18,
        likes: 12,
        timeAgo: '4 hours ago',
        isHelpful: false,
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: "Anti-inflammatory meal prep ideas?",
        content: "Looking for some easy meal prep recipes that are anti-inflammatory and PCOS-friendly. What are your go-to meals?",
        author: "Lisa R.",
        category: 'nutrition',
        replies: 31,
        likes: 67,
        timeAgo: '6 hours ago',
        isHelpful: true,
        createdAt: new Date().toISOString()
      }
    ];
    await fs.writeFile(POSTS_FILE, JSON.stringify(initialPosts, null, 2));
  }

  // Initialize resources file
  try {
    await fs.access(RESOURCES_FILE);
  } catch {
    const initialResources = {
      overview: [
        {
          id: uuidv4(),
          title: "What is PCOS? Complete Guide",
          type: "Article",
          duration: "10 min read",
          difficulty: "Beginner",
          description: "A comprehensive introduction to Polycystic Ovary Syndrome, covering causes, prevalence, and basic understanding.",
          tags: ["basics", "introduction", "causes"],
          rating: 4.8,
          views: 15420,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          title: "PCOS Types and Variations",
          type: "Video",
          duration: "15 min",
          difficulty: "Intermediate",
          description: "Understanding the different types of PCOS and how they affect treatment approaches.",
          tags: ["types", "diagnosis", "treatment"],
          rating: 4.6,
          views: 8930,
          createdAt: new Date().toISOString()
        }
      ],
      symptoms: [
        {
          id: uuidv4(),
          title: "Recognizing PCOS Symptoms",
          type: "Interactive Guide",
          duration: "20 min",
          difficulty: "Beginner",
          description: "Interactive tool to help identify and understand common PCOS symptoms.",
          tags: ["symptoms", "diagnosis", "self-assessment"],
          rating: 4.9,
          views: 22340,
          createdAt: new Date().toISOString()
        }
      ],
      nutrition: [
        {
          id: uuidv4(),
          title: "PCOS-Friendly Meal Planning",
          type: "Guide + Recipes",
          duration: "30 min",
          difficulty: "Beginner",
          description: "Complete meal planning guide with 50+ PCOS-friendly recipes and shopping lists.",
          tags: ["meal-planning", "recipes", "shopping"],
          rating: 4.9,
          views: 31200,
          createdAt: new Date().toISOString()
        }
      ]
    };
    await fs.writeFile(RESOURCES_FILE, JSON.stringify(initialResources, null, 2));
  }

  // Initialize bookmarks file
  try {
    await fs.access(BOOKMARKS_FILE);
  } catch {
    await fs.writeFile(BOOKMARKS_FILE, JSON.stringify({}, null, 2));
  }
}

// Helper functions
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Community Support API Routes

// Get all posts
app.get('/api/community/posts', async (req, res) => {
  try {
    const posts = await readJsonFile(POSTS_FILE);
    if (posts === null) {
      return res.status(500).json({ error: 'Failed to read posts' });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new post
app.post('/api/community/posts', async (req, res) => {
  try {
    const { title, content, category, author = 'Anonymous' } = req.body;
    
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }

    const posts = await readJsonFile(POSTS_FILE);
    if (posts === null) {
      return res.status(500).json({ error: 'Failed to read posts' });
    }

    const newPost = {
      id: uuidv4(),
      title,
      content,
      category,
      author,
      replies: 0,
      likes: 0,
      timeAgo: 'Just now',
      isHelpful: false,
      createdAt: new Date().toISOString()
    };

    posts.unshift(newPost);
    
    const success = await writeJsonFile(POSTS_FILE, posts);
    if (!success) {
      return res.status(500).json({ error: 'Failed to save post' });
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like a post
app.post('/api/community/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await readJsonFile(POSTS_FILE);
    
    if (posts === null) {
      return res.status(500).json({ error: 'Failed to read posts' });
    }

    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts[postIndex].likes += 1;
    
    const success = await writeJsonFile(POSTS_FILE, posts);
    if (!success) {
      return res.status(500).json({ error: 'Failed to update post' });
    }

    res.json(posts[postIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Educational Resources API Routes

// Get resources by category
app.get('/api/resources/:category?', async (req, res) => {
  try {
    const { category } = req.params;
    const resources = await readJsonFile(RESOURCES_FILE);
    
    if (resources === null) {
      return res.status(500).json({ error: 'Failed to read resources' });
    }

    if (category) {
      res.json(resources[category] || []);
    } else {
      res.json(resources);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookmarks
app.get('/api/bookmarks/:userId?', async (req, res) => {
  try {
    const { userId = 'default' } = req.params;
    const bookmarks = await readJsonFile(BOOKMARKS_FILE);
    
    if (bookmarks === null) {
      return res.status(500).json({ error: 'Failed to read bookmarks' });
    }

    res.json(bookmarks[userId] || []);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add/remove bookmark
app.post('/api/bookmarks/:userId/:resourceId', async (req, res) => {
  try {
    const { userId = 'default', resourceId } = req.params;
    const { action } = req.body; // 'add' or 'remove'
    
    const bookmarks = await readJsonFile(BOOKMARKS_FILE);
    if (bookmarks === null) {
      return res.status(500).json({ error: 'Failed to read bookmarks' });
    }

    if (!bookmarks[userId]) {
      bookmarks[userId] = [];
    }

    const userBookmarks = bookmarks[userId];
    const existingIndex = userBookmarks.indexOf(resourceId);

    if (action === 'add' && existingIndex === -1) {
      userBookmarks.push(resourceId);
    } else if (action === 'remove' && existingIndex !== -1) {
      userBookmarks.splice(existingIndex, 1);
    }

    const success = await writeJsonFile(BOOKMARKS_FILE, bookmarks);
    if (!success) {
      return res.status(500).json({ error: 'Failed to save bookmarks' });
    }

    res.json({ bookmarks: userBookmarks });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize and start server
async function startServer() {
  try {
    await initializeDataFiles();
    app.listen(PORT, () => {
      console.log(`🚀 PCOS Backend Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🤝 Community API: http://localhost:${PORT}/api/community/posts`);
      console.log(`📚 Resources API: http://localhost:${PORT}/api/resources`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
