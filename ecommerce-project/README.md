🛒 Modern E-commerce Platform (React + Redux + Tailwind)
A high-performance e-commerce frontend refactored for scalable state management and utility-first styling.

📜 Attribution & Credits
This project is based on the e-commerce tutorial by SuperSimpleDev (Watch the original here).

Original Code: SuperSimpleDev.

Refactor & Modernization: Bruno Lustro.

Key Contribution: I transitioned the project from its original prop-drilling state to a professional Redux Toolkit (RTK) architecture and migrated the legacy CSS to a modern Tailwind CSS framework.

🛠️ Updated Feature: Category Drawer Implementation
Implemented a slide-out Category Drawer to enhance product discoverability. This feature demonstrates the power of Redux Toolkit and Tailwind CSS for handling complex global filtering logic without redundant data fields.

Key Highlights:
Zero-Data Redundancy: Instead of adding a new "category" field to the database, the drawer utilizes the existing keywords array to categorize items dynamically.

Synchronized State Management: The filtering logic handles "Filter Collisions" by intelligently resetting the category when a new search is performed, and vice versa.

CSS-Only UI: The hamburger menu and drawer animations are built entirely with Tailwind CSS transforms and transitions, ensuring zero image-loading latency and a sharp UI on all resolutions.

🛠️ Tech Stack
Frontend: React 18 (Functional Components & Hooks)

Styling: Tailwind CSS — Refactored from traditional CSS for responsive design (Tailwind branch can be acessed in https://github.com/blustro/react-course/tree/tailwind-implementation/ecommerce-project)

State Management: Redux Toolkit (RTK) — Refactored for scalability

Filtering Engine: Dynamic keyword-based filtering with a slide-out navigation drawer. (Accesse in the following branch: https://github.com/blustro/react-course/tree/filter-drawer)

Routing: React Router v7

HTTP Client: Axios

Utilities: Day.js for delivery date formatting

📅 Future Roadmap

[x] Redux Implementation: Transitioned Cart and Product logic to RTK.

[x] Category Filtering: Implemented keyword-based drawer navigation.

[ ] Next.js Migration: Transitioning to a meta-framework to leverage Server-Side Rendering (SSR) and optimized routing.

[ ] TypeScript Implementation: Migrating the codebase to TypeScript to ensure strict type safety across all Redux slices and components.
