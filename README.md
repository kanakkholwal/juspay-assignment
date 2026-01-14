# Juspay eCommerce Dashboard

A premium, responsive eCommerce dashboard built with **React 19**, **Vite**, and **Tailwind CSS v4**. This project features a comprehensive dashboard with data visualizations and a robust order management system.

## 🚀 Features

- **Interactive Dashboard**: 
  - Real-time stats with trend indicators.
  - Revenue analysis using Area Charts.
  - Projections vs Actuals Bar Charts.
  - Sales distribution and geographical revenue tracking.
- **Advanced Order Management**:
  - Data table powered by **TanStack Table**.
  - Global search, sorting, and pagination.
  - Status tracking with color-coded indicators.
  - Row selection and action menus.
- **Premium UI/UX**:
  - **Dark Mode** support with `next-themes`.
  - Smooth animations using **Framer Motion**.
  - Responsive design with **Tailwind CSS** and **Container Queries**.
  - Skeleton loaders for improved perceived performance.
- **State Management**: Centralized state using **Redux Toolkit**.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Table**: [TanStack Table v8](https://tanstack.com/table/v8)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Components**: [Radix UI](https://www.radix-ui.com/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd juspay-assignment
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

## 🧠 Design Decisions & Architecture

### 1. State Management Strategy
I chose **Redux Toolkit** to handle the application's state. While React's built-in `useState` and `useContext` are sufficient for small apps, Redux provides a more predictable state container for complex dashboards where multiple components (Sidebar, Navbar, Dashboard, OrderList) need to share and react to the same data.

### 2. Component-Level Responsiveness
Instead of relying solely on viewport-based media queries, I implemented **Tailwind Container Queries** (`@container`). This allows components like the `StatCard` or `RevenueChart` to adapt their layout based on the size of their parent container, making them truly modular and reusable in different layout contexts.

### 3. Data Table Architecture
For the `OrderList`, I integrated **TanStack Table**. This "headless" UI approach allowed me to maintain full control over the styling (using Tailwind) while leveraging powerful features like multi-column sorting, global filtering, and pagination out of the box.

### 4. Visual Excellence
The UI follows a modern, "glassmorphism" inspired aesthetic with subtle borders, soft shadows, and a curated color palette. I used **Framer Motion** for staggered entrance animations and smooth transitions between states, ensuring the app feels "alive" and premium.

## 🚧 Challenges & Solutions

- **Challenge**: Managing complex chart responsiveness in a grid layout.
  - **Solution**: Used `ResponsiveContainer` from Recharts combined with container-based grid layouts to ensure charts never overflow or break the layout.
- **Challenge**: Implementing a performant global search across the order list.
  - **Solution**: Leveraged TanStack Table's built-in filtering logic with `useMemo` to ensure search operations are fast and don't cause unnecessary re-renders.
- **Challenge**: Dark Mode consistency across third-party libraries.
  - **Solution**: Custom CSS variables were mapped to Tailwind's theme, and chart colors were dynamically adjusted based on the current theme state.

## 📈 Improvements Made

- **Skeleton Loaders**: Replaced basic "Loading..." text with polished skeleton screens that match the actual layout, reducing layout shift.
- **Custom Icon System**: Implemented a centralized SVG icon system for consistent branding and optimized loading.
- **Modular Slices**: Organized Redux state into feature-based slices (`dashboardSlice`, `ordersSlice`, etc.) for better maintainability.
- **Accessibility**: Used semantic HTML and Radix UI primitives to ensure the dashboard is accessible to all users.
