# UniSwap: University Student Marketplace

UniSwap is a localized, on-campus marketplace web application designed to help university students buy, sell, and trade items seamlessly. From textbooks and study equipment to electronics and dorm essentials, UniSwap connects students within the same university to facilitate safe, fast, and convenient peer-to-peer commerce.

## 🚀 Features

- **Responsive Marketplace:** Browse a beautifully designed, responsive grid of student listings sorted by categories.
- **Dark Mode Support:** Fully functional Light and Dark modes with automatic system preference detection and local storage persistence.
- **Secure Authentication:** User login and registration powered by JWT (JSON Web Tokens) and bcrypt password hashing.
- **Dynamic Stock Management:** Real-time stock deduction upon checkout. Prevents users from purchasing out-of-stock items.
- **Seller Dashboard:** Sellers can view, edit, and delete their own listings through a dedicated "My Listings" view.
- **Drag & Drop Image Uploads:** Sellers can easily upload photos of their items via intuitive drag-and-drop or file selection.
- **Private Seller Instructions:** Contact details and room numbers are securely hidden from the public and only revealed to the buyer upon checkout confirmation.
- **Flat JSON Database:** Runs entirely on a lightweight `database.json` file—no complex SQL setup or native module compilation required!

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite)
- **Framer Motion** (for smooth page animations and transitions)
- **Lucide React** (for modern SVG icons)
- **Vanilla CSS** (with advanced CSS variables for theme switching)

### Backend
- **Node.js & Express.js**
- **JSON Web Tokens (JWT)** (for stateless authentication)
- **Bcrypt.js** (for password security)
- **Custom JSON DB Engine** (reads/writes directly to `database.json`)

## 📦 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/json-db.js      # JSON Database engine
│   │   ├── routes/                # API Endpoints (Auth, Products)
│   │   └── server.js              # Express app entry point
│   ├── database.json              # The flat-file database
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/            # Reusable UI elements (Navbar, Cards)
    │   ├── context/               # React Contexts (Auth, Cart, Theme)
    │   ├── pages/                 # Full-page routing components
    │   ├── styles/                # Global CSS and Theme variables
    │   └── main.jsx               # React entry point
    └── package.json
```

## ⚙️ How to Run Locally

### 1. Start the Backend Server
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`. 
*Note: If `database.json` is missing, the server will automatically create one with default data.*

### 2. Start the Frontend App
Open a new terminal window and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Vite will launch the development server (typically on `http://localhost:5173`). Open that URL in your browser to start using UniSwap!

## 🧪 Default Test Accounts
If you reset the database, the following accounts will be automatically created:
- **Amara K.** (Password: `hashedpassword`)
- **Dinuka P.** (Password: `hashedpassword`)

*It is recommended to register a new account via the UI for testing.*

## 📝 Assignment Notes
This project was developed for a University Web Application assignment. The architecture was specifically pivoted to a JSON-based database to resolve native compilation (`node-gyp`) issues specific to the target Windows environment. 
