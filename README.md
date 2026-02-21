# 💰 Expense Tracker - Mobile App

[![React Native](https://img.shields.io/badge/React_Native-0.83-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A feature-rich, high-performance mobile application designed to help you take control of your finances. From daily expense tracking to intricate bill splitting with friends, this app provides a seamless and aesthetically pleasing experience.

---

## ✨ Key Features

### 📊 Advanced Analytics
- **Visual Trends**: View your spending habits over the last 6 months with interactive bar charts.
- **Category Breakdown**: Understand where your money goes with dynamic pie charts.
- **Quick Summaries**: Get instant insights into your current month's spending versus your average.

### 👥 Smart Bill Splitting
- **Group Sharing**: Split any expense with multiple friends effortlessly.
- **Net Balances**: Track exactly who owes you and whom you owe in a centralized dashboard.
- **Settle Up**: One-tap settlement tracking to keep your financial relationships clear.
- **Friend Network**: Manage friend requests and build your circle for shared expenses.

### 📅 Calendar Integration
- **Daily Visualization**: Track your expenses on a dedicated calendar view.
- **Historical Data**: Easily navigate through past dates to review your spending history.

### 🔒 Secure & Private
- **JWT Authentication**: Secure login and registration with token-based authorization.
- **Protected Routes**: Your financial data is only accessible to you.
- **Password Encryption**: Industry-standard hashing for user security.

### 🎨 Premium UI/UX
- **Modern Design**: Clean, card-based layout with a professional color palette.
- **Smooth Animations**: Powered by `react-native-reanimated` for a fluid experience.
- **Responsive Elements**: Optimized for various screen sizes and orientations.

---

## 🛠️ Tech Stack

### Frontend (Mobile)
- **Framework**: React Native (TypeScript)
- **Navigation**: React Navigation (Stack & Drawer)
- **State Management**: Context API
- **Networking**: Axios
- **Charts**: React Native Chart Kit
- **Styling**: Vanilla CSS with Reanimated

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JSON Web Tokens (JWT) & BcryptJS

---

## 📂 Project Structure

```bash
Expense-Tracker/
├── frontend/             # React Native Mobile App
│   ├── src/
│   │   ├── components/   # Reusable UI components (Charts, Cards)
│   │   ├── screens/      # All App Screens (Split, Analysis, Calendar, etc.)
│   │   ├── navigation/   # Navigation configurations
│   │   ├── services/     # API configuration (Axios)
│   │   └── context/      # Global State (AuthContext)
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── models/       # Mongoose Schemas (User, Expense, Split, Friend)
│   │   ├── controllers/  # Business Logic
│   │   ├── routes/       # API Endpoints
│   │   └── middleware/   # Auth & Error handling
```

---

## 🚀 Getting Started

### 1. Prerequisities
- Node.js (v20 or higher)
- MongoDB (Local or Atlas)
- React Native Development Environment (Android Studio / Xcode)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Update the API base URL in `frontend/src/services/api.ts` (if necessary).

Run the app:
```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by [Tejas](https://github.com/TejasD-13)
