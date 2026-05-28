const express = require('express');
const router = express.Router();
const {
  analyzeAndStoreProfile,
  getAllProfiles,
  getProfileByUsername
} = require('../controllers/profileController');

// Define routes
router.post('/:username', analyzeAndStoreProfile);
router.get('/', getAllProfiles);
router.get('/:username', getProfileByUsername);

module.exports = router;
