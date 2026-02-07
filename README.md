# RentalCar - Car Rental Service

A modern web application for car rental, built with **Next.js**, **TypeScript**, and **Zustand**.
This project allows users to browse a car catalog, filter results by various criteria, manage a list
of favorites, and book cars through an interactive form.

## 🚀 Technologies Used

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (with Persist middleware)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) &
  [Axios](https://axios-http.com/)
- **Styling:** CSS Modules
- **Form & UI Components:** Native Form Actions & [Headless UI](https://headlessui.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## ✨ Key Features

- **Dynamic Catalog:** Fetches car data from a remote API with server-side pagination.
- **Advanced Filtering:** Filter cars by brand, rental price, and mileage (handled on the backend).
- **Favorites System:** Add cars to favorites. The list is persisted in `localStorage`.
- **Car Details Page:** Detailed view for each vehicle with unique specifications.
- **Booking Form:** Functional form to rent a car with a custom date picker and success
  notifications.
- **SEO Optimized:** Meta tags and Open Graph support for all pages.
- **Responsive Design:** Optimized for desktop viewing according to the provided layout.

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/VadymByi/rental-car](https://github.com/VadymByi/rental-car)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open the app:** Visit
    [https://rental-car-psi-ten.vercel.app/](https://rental-car-psi-ten.vercel.app/) in your
    browser.

## 📁 Project Structure

- `app/` - Application routes and pages.
- `api/` - Axios instance and API service methods.
- `store/` - Zustand global state management.
- `components/` - Reusable UI components.
- `public/` - Static assets like SVG sprites and images.

## 👤 Author

- **Vadym Buinov** — [GitHub](https://github.com/VadymByi)
