# GitHub Profile Analyzer API

**Live Deployed API URL:** [https://github-profile-analyzer-cjnn.onrender.com](https://github-profile-analyzer-cjnn.onrender.com)
**Example Endpoint:** [https://github-profile-analyzer-cjnn.onrender.com/api/profiles/octocat](https://github-profile-analyzer-cjnn.onrender.com/api/profiles/octocat)

A Node.js & Express backend service that analyzes a GitHub user profile using the public GitHub API and stores insights in a MySQL database.

## Tech Stack
- Node.js
- Express.js
- MySQL (mysql2)
- Axios (for GitHub API calls)

## 🌟 Tech/Features Added Beyond Requirements
- **Smart "Upsert" Logic**: Uses `ON DUPLICATE KEY UPDATE` to automatically update a user's stats if they are fetched again, preventing duplicate database entries and keeping data fresh.
- **Database Connection Pooling**: Utilizes `mysql2` connection pools rather than a single connection for improved performance, scalability, and stability under load.
- **Cloud-Ready Security**: Configured to support SSL connections (`rejectUnauthorized: false`), allowing seamless integration with modern, secure cloud databases like Aiven or PlanetScale.
- **API Rate Limit Handling**: Built-in support for authenticated GitHub API requests via `GITHUB_TOKEN` to bypass the standard 60-requests-per-hour limit and scale up to 5,000 requests per hour.
- **Automated Error Handling**: Gracefully catches `404 Not Found` (when a GitHub user doesn't exist) and `403 Forbidden` (rate limit) errors, returning clear, readable JSON responses to the client instead of crashing the server.

## Prerequisites
- Node.js installed (v14 or higher)
- MySQL Server installed and running locally

## Local Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd github-profile-analyzer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Ensure your MySQL server is running.
   - Run the provided `schema.sql` file in your MySQL environment to create the database and table.
     ```bash
     mysql -u root -p < schema.sql
     ```
   *(Alternatively, copy the contents of `schema.sql` and run it in your preferred SQL client like MySQL Workbench or phpMyAdmin).*

4. **Environment Variables**
   - Rename `.env.example` to `.env` or just ensure `.env` has the correct values.
   - Update your MySQL credentials in `.env`:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=github_profiles
     # GITHUB_TOKEN=optional_token
     ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *(Ensure you have a `dev` script in `package.json` like `"dev": "nodemon server.js"`. If not, start using `node server.js` or `npx nodemon server.js`)*

## API Endpoints

### 1. Analyze and Store Profile
- **URL**: `/api/profiles/:username`
- **Method**: `POST`
- **Description**: Fetches profile data from GitHub, stores it in the MySQL database, and returns the analyzed data.

### 2. Get All Profiles
- **URL**: `/api/profiles`
- **Method**: `GET`
- **Description**: Returns a list of all analyzed profiles stored in the database.

### 3. Get Single Profile
- **URL**: `/api/profiles/:username`
- **Method**: `GET`
- **Description**: Returns the stored data for a specific GitHub user.

## Deployment Instructions (Free Platforms e.g. Render/Railway)

1. **Database**: Since it's MySQL, you can use a free MySQL hosting provider (e.g., Aiven, PlanetScale, Railway) and grab the connection URL/credentials.
2. **Environment Variables**: Add your DB credentials and `PORT` into the environment variables section of your hosting platform.
3. **Web Service**: Deploy this repository on Render or Railway as a Node.js Web Service.
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

## Postman Collection
A Postman collection `postman_collection.json` is provided in the root directory. Import it into Postman to easily test the endpoints.
