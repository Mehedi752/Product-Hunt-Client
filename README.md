# 🌐 ProductHunt - Discover & Share Tech Innovations

Welcome to **ProductHunt**, the ultimate platform for discovering and sharing the latest tech innovations! Whether it's software, AI tools, or mobile apps, **ProductHunt** connects tech enthusiasts and creators in one collaborative space. 🚀

---

## **✨ Core Features**

### **🌟 Discover & Explore**
- Browse a curated collection of the latest tech products.
- Search and filter by categories like AI tools, web apps, and more.

### **📈 Role-Based Dashboards**
- **User Dashboard**: Add and manage personal product submissions.
- **Moderator Dashboard**: Review and approve product submissions.
- **Admin Dashboard**: Manage users, analyze statistics, and handle coupons.

### **🗳️ Voting & Reviews**
- Upvote or downvote products to influence their visibility.
- Leave reviews and feedback on tech products.

### **🔒 Secure Authentication**
- Sign in with email and password or Google.
- Role-based access control for enhanced security.

### **📱 Fully Responsive Design**
- Optimized for desktop, tablet, and mobile devices for a seamless user experience.

---

## **🚀 How to Access the Website**

1. Open the live site: [**ProductHunt Live**](https://assignment-12-e061e.web.app/).
2. Sign up or log in to access the features.
3. Explore the latest tech products or submit your own!

---

## **📚 Tech Stack**

### **Frontend**:
- React.js
- Tailwind CSS
- Daisy UI
- React Router
- React Toastify (Notifications)
- Framer Motion (Animations)

### **Backend**:
- Node.js
- Express.js
- MongoDB
- Firebase & JWT for Authentication
- Cors & Cookie Parser

### **Additional Tools**:
- Sweet Alert for notifications
- Chart.js for data visualization (admin statistics)

---

## **📦 Dependencies**

### **Frontend Dependencies (`client/package.json`)**
- `react`
- `react-router-dom`
- `tailwindcss`
- `daisyui`
- `react-toastify`
- `axios`
- `firebase`
- `react-icons`
- `framer-motion`

### **Backend Dependencies (`server/package.json`)**
- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `bcryptjs`
- `mongoose`
- `cookie-parser`
- `nodemon` (devDependency)

---

## **💻 Running the Project Locally**

Follow these steps to set up the **ProductHunt** platform on your local machine.

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/producthunt.git
cd producthunt
```

### **2️⃣ Setup the Backend**
```bash
cd server
npm install  # Install backend dependencies
```

#### **Configure `.env` File for Backend**
Create a `.env` file inside the `server/` directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

#### **Start the Backend Server**
```bash
npm run dev  # Runs the server with nodemon
```

---

### **3️⃣ Setup the Frontend**
```bash
cd ../client
npm install  # Install frontend dependencies
```

#### **Configure `.env` File for Frontend**
Create a `.env` file inside `client/` and add:
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
```

#### **Start the Frontend**
```bash
npm run dev  # Runs the React frontend
```

Now, open **http://localhost:5173/** in your browser to see the website in action! 🚀

---

## **🛠️ Contributing**
We welcome contributions! Follow these steps to contribute:
1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature-name`).
3. **Commit your changes** (`git commit -m "Added new feature"`).
4. **Push to your branch** (`git push origin feature-name`).
5. **Create a Pull Request**.

---

## **📜 License**
This project is **open-source** and licensed under the **MIT License**.

---

