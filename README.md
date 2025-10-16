# 📰 Truck Driver News App

A single-page React application (SPA) built with **Vite** and **React Router** that displays real-time trucking industry news from a **WordPress REST API** and allows users to submit, view, edit, and delete feedback using the **Airtable API**.

This project was developed as the **final project for the Code the Dream React V3 course** and demonstrates mastery of key React concepts including routing, hooks, controlled forms, CRUD operations, external API integration, and modular CSS.

---

## 🚀 Features

### 📰 News Feed

- Fetches and displays trucking news posts from the public **WordPress API** (`truckdrivernews.com/wp-json/wp/v2/posts`).
- Each article includes a title, date, image, and content formatted properly.
- Clicking an article shows the **Article Detail** page with full content and image.

### 💬 Feedback Manager

- Full **CRUD** with **Airtable**:
  - ✏️ Create new feedback
  - 📖 Read feedbacks (with pagination, 5 per page)
  - 🔁 Edit feedback text
  - 🗑️ Delete feedback
- Sorting by newest or oldest
- Loading and error states

### 🌐 Routing

- SPA built with **React Router**
- Includes the following pages:
  - `/` → Home (News)
  - `/feedback` → Feedback Manager
  - `/about` → About page
  - `*` → Not Found page

### 🎨 Styling

- Uses **CSS Modules** for component-level styling
- Clean, consistent design with clear typography
- Custom **favicon** and icon branding

---

## 🧠 Technologies

- **React** (functional components only)
- **React Router DOM**
- **Vite**
- **Airtable REST API**
- **WordPress REST API**
- **CSS Modules**
- **useState**, **useEffect**, **useCallback**, **props.children**

---

## ⚙️ Project Structure
