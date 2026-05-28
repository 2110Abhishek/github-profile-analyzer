const pool = require('../config/db');
const { getGithubProfile } = require('../services/githubService');

// @desc    Fetch profile from GitHub and store in DB
// @route   POST /api/profiles/:username
// @access  Public
const analyzeAndStoreProfile = async (req, res) => {
  const { username } = req.params;

  try {
    // 1. Fetch from GitHub API
    const githubData = await getGithubProfile(username);

    // Extract necessary insights
    const profileData = {
      username: githubData.login,
      name: githubData.name,
      bio: githubData.bio,
      public_repos: githubData.public_repos,
      followers: githubData.followers,
      following: githubData.following,
      avatar_url: githubData.avatar_url
    };

    // 2. Store or update in DB
    const sql = `
      INSERT INTO profiles (username, name, bio, public_repos, followers, following, avatar_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        avatar_url = VALUES(avatar_url),
        updated_at = CURRENT_TIMESTAMP
    `;
    
    const values = [
      profileData.username,
      profileData.name,
      profileData.bio,
      profileData.public_repos,
      profileData.followers,
      profileData.following,
      profileData.avatar_url
    ];

    await pool.query(sql, values);

    // Fetch the updated record to return
    const [rows] = await pool.query('SELECT * FROM profiles WHERE username = ?', [profileData.username]);

    res.status(201).json({
      message: 'Profile analyzed and stored successfully',
      data: rows[0]
    });

  } catch (error) {
    if (error.message === 'GitHub profile not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error analyzing profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all analyzed profiles
// @route   GET /api/profiles
// @access  Public
const getAllProfiles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles ORDER BY updated_at DESC');
    res.status(200).json({
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single profile by username
// @route   GET /api/profiles/:username
// @access  Public
const getProfileByUsername = async (req, res) => {
  const { username } = req.params;
  
  try {
    const [rows] = await pool.query('SELECT * FROM profiles WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found in database' });
    }

    res.status(200).json({
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  analyzeAndStoreProfile,
  getAllProfiles,
  getProfileByUsername
};
