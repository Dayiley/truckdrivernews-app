📰 Truck Driver News App
A single-page React application (SPA) built with Vite and React Router, displaying real-time trucking industry news from a WordPress REST API and allowing users to read, submit, edit, and delete feedback through the Airtable API.

This project was developed as the final project for the Code the Dream React V3 course

📘 Project Description
The application fetches trucking news from a public WordPress API and allows users to leave feedback stored in Airtable.
It includes routing, reusable components, client-side validation, and persistent caching with session storage.

🚀 Features
📰 News Feed (Home)

Fetches and displays trucking news from the public WordPress REST API (https://truckdrivernews.com/wp-json/wp/v2/posts?_embed).
Each article includes a title, image, publication date, and formatted content.
Articles are cached in sessionStorage for faster reloads (10-minute TTL).
Clicking an article opens the Article Detail page for full content.

💬 Feedback Manager
Full CRUD functionality powered by Airtable:
✏️ Create feedback entries
📖 Read feedbacks with pagination
📝 Edit existing feedbacks
🗑️ Delete feedbacks
Sorting by newest or oldest submissions
Controlled form with validation and error messages
Includes loading, empty, and error UI states

🌐 Routing
SPA built with React Router DOM
Pages:
/ → Home (News Feed)
/feedback → Feedback Manager
/about → About Page

- → Not Found Page

🧩 Reusable Components
Header with responsive navigation and theme toggle
Footer with dynamic year and GitHub link via children prop
ArticleCard, FeedbackForm, FeedbackList, and FeedbackItem components

🎨 Styling
-Global styling in theme.css
-CSS Modules for scoped, maintainable component styles
-Consistent layout and typography
-Custom favicon and optional PWA icons

🧠 Technologies
-React
-React Router DOM
-Vite
-Airtable REST API
-WordPress REST API
-CSS Modules
-React Hooks: useState, useEffect, useCallback
-Props & Children Components

⚙️ Installation & Running the Project
1️⃣ Clone the Repository
git clone https://github.com/Dayiley/truckdrivernews-app.git
cd truckdrivernews-app

2️⃣ Install Dependencies
npm install

3️⃣ Environment Setup
Copy .env.local.example → .env.local
Then add your own Airtable credentials.

4️⃣ Run in Development Mode
npm run dev

5️⃣ Build for Production
npm run build

6️⃣ Preview Production Build
npm run preview

🔐 API Connections
WordPress API
Endpoint: https://truckdrivernews.com/wp-json/wp/v2/posts?_embed
No authentication required (public data).

Airtable API
Used for storing and managing user feedback.
Required credentials (add to .env.local):
VITE_AIRTABLE_TOKEN=your_airtable_personal_access_token
VITE_AIRTABLE_BASE_ID=your_airtable_base_id
VITE_AIRTABLE_TABLE_NAME=your_table_name
