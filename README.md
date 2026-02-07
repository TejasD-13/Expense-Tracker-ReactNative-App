# React Native Expense Tracker

A mobile application built with **React Native** for tracking expenses.  
The app supports authentication, API integration, and navigation using stack-based routing.

---

## 🚀 Features

- User authentication (login & protected routes)
- View list of expenses
- API integration for fetching data
- Clean and reusable component structure
- Stack navigation with typed routes
- Context API for global state management

---

## 🛠️ Tech Stack

- **React Native**
- **TypeScript**
- **React Navigation**
- **Context API**
- **Axios** (API service)
- **MongoDB / Node.js API** (backend – assumed)

---

## 📁 Project Structure
```bash
src/
│
├── components/ # Reusable UI components
├── context/ # Global state (AuthContext)
├── navigation/ # Navigation stack & types
├── screens/ # App screens
├── services/ # API configuration
├── types/ # Shared TypeScript types
└── utils/ # Helper functions
```

---

## 🔐 Authentication Flow

- Authentication state is managed using **AuthContext**
- Protected screens are only accessible when logged in
- Auth token is attached to API requests automatically

---

## 📡 API Integration

API requests are handled via a centralized Axios instance:

```ts
import api from "../services/api";
```

This allows:

Easy token injection

Cleaner API calls

Better error handling

🧭 Navigation
Navigation is handled using @react-navigation/native-stack with full TypeScript support:

NativeStackScreenProps<RootStackParamList, "ScreenName">
▶️ Getting Started
1. Install dependencies
```bash
npm install
# or
yarn install
```
2. Start Metro
```bash
npx react-native start
```
3. Run the app
```bash
npx react-native run-android
# or
npx react-native run-ios
```

🧪 Environment Variables
Create a .env file:
```bash
API_URL=http://localhost:5000
```
