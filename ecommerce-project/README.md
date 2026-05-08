# 🛒 Modern E-commerce Platform (React + Redux + Tailwind)
A high-performance e-commerce frontend refactored for scalable state management and utility-first styling.

## 📜 Attribution & Credits
This project is based on the e-commerce tutorial by SuperSimpleDev (Watch the original [here](https://www.youtube.com/watch?v=TtPXvEcE11E)).

- **Original Code:** SuperSimpleDev.
- **Refactor & Modernization & Next Migration:** Bruno Lustro.
- **Key Contribution:** I transitioned the project from its original prop-drilling state to a professional Redux Toolkit (RTK) architecture and migrated the legacy CSS to a modern Tailwind CSS framework. Most recently, I successfully migrated the entire application from React Router to the Next.js App Router, implementing server-side logic and dynamic API routing.

## 🛠️ Key Features & Heavy Lifting
### Next.js Migration & API Routing
- **Full-Stack Transition:** Migrated from a purely client-side React app to Next.js 15+, leveraging API Route Handlers for Cart, Orders, and Tracking logic.
- **Dynamic Segments:** Implemented professional RESTful patterns using dynamic directory structures (e.g., `/api/cart-items/[productId]`).
- **Transactional UX:** Utilized `usePathname` to create a "focused checkout" experience, dynamically hiding navigation elements like the Category Drawer to reduce customer friction during purchase.

### Advanced State Management (RTK)
- **Scalable Architecture:** Managed global state for products, cart, delivery options, and order history.
- **Complex Async Logic:** Used `createAsyncThunk` to synchronize local UI state with the backend, ensuring a "Single Source of Truth."
- **Filter Logic:** Maintained the "Zero-Data Redundancy" engine, utilizing existing keywords for dynamic categorization via the slide-out Drawer.

### Checkout & Tracking Engine
- **Real-time Math:** Built a reactive Order Summary that computes product costs, dynamic shipping fees (based on user selection), and taxes on the fly.
- **Live Progress Tracking:** Developed a tracking system that calculates delivery progress (Preparing/Shipped/Delivered) by comparing order timestamps with current real-time data.

## 🛠️ Tech Stack
- **Frontend:** Next.js & React 18
- **Styling:** Tailwind CSS (Responsive, utility-first design)
- **State Management:** Redux Toolkit (RTK)
- **Routing:** Next.js Navigation
- **HTTP Client:** Axios
- **Utilities:** Day.js for delivery date formatting

## 📅 Roadmap & Evolution
- [x] Redux Implementation: Transitioned Cart and Product logic to RTK.
- [x] Tailwind Migration: Refactored legacy CSS to utility classes.
- [x] Category Filtering: Implemented keyword-based drawer navigation.
- [x] Next.js Migration: Leveraged Server-Side Rendering (SSR) and optimized API routing.
- [ ] TypeScript Implementation: (Next Step) Migrating the codebase to TypeScript to ensure strict type safety across all slices and components.
- [ ] Authentication
- [ ] Payment integration (Stripe)
