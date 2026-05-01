# 🛒 Modern E-commerce Platform (React + Redux)

A high-performance e-commerce frontend refactored for scalable state management.

## 📜 Attribution & Credits

This project is based on the e-commerce tutorial by **SuperSimpleDev** ([Watch the original here](https://www.youtube.com/watch?v=TtPXvEcE11E)).

- **Original Code:** SuperSimpleDev.
- **Refactor & Modernization:** Bruno Lustro.
- **Key Contribution:** I transitioned the project from its original prop-drilling state to a professional **Redux Toolkit (RTK)** architecture to demonstrate advanced state management and API synchronization.

## 🚀 Key Features

- **Dynamic Product Grid:** Real-time filtering and search functionality.
- **Advanced Cart System:** Integrated quantity management and delivery selection.
- **Complex Checkout Flow:** Dynamic calculation of taxes, shipping, and order totals.
- **Real-time Order Tracking:** Visual progress tracking based on order timestamps.

## 🛠️ Tech Stack

- **Frontend:** React 18 (Functional Components & Hooks)
- **State Management:** Redux Toolkit (RTK) — _Refactored for scalability_
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Utilities:** Day.js for delivery date formatting

## 🔄 The Evolution: Moving to Redux

The core of my work on this project was a structural pivot to eliminate "Prop Drilling."

- **Centralized Store:** Moved cart and payment logic into a global Redux state.
- **Async Thunks:** Implemented `createAsyncThunk` for cleaner, predictable API interactions.
- **Middleware:** Utilized Redux Logger for real-time state change tracking.

## 📅 Future Roadmap

- [ ] **Next.js Migration:** Implementation of SSR (Server-Side Rendering) for SEO.
- [ ] **TypeScript:** Total refactor for strict type safety.
