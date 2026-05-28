const axios = require('axios');

const getGithubProfile = async (username) => {
  try {
    const config = {};
    if (process.env.GITHUB_TOKEN) {
      config.headers = {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      };
    }
    
    const response = await axios.get(`https://api.github.com/users/${username}`, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('GitHub profile not found');
    }
    throw new Error('Error fetching data from GitHub: ' + error.message);
  }
};

module.exports = {
  getGithubProfile
};
