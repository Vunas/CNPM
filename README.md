# POS Management System

This is a full-stack Point of Sale (POS) management system built with **ReactJS + Vite** for the frontend and **NestJS** for the backend. The system provides a complete solution for managing sales, restaurants, user accounts, products, and inventory in a modern and scalable architecture.

## Features

### Frontend (React + Vite)

- User-friendly dashboard interface
- Authentication & role-based access control
- Real-time order and table management
- QR code scanning for restaurant tables
- Sales and statistics visualization (charts, reports)
- Product and inventory management

### Backend (NestJS)

- RESTful API with JWT authentication
- Role and permission management
- Orders, tables, and restaurant CRUD operations
- Inventory and product tracking
- Sales reporting and analytics
- MySQL database integration (via XAMPP)

## Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Frontend  | ReactJS, Vite, TailwindCSS     |
| Backend   | NestJS, TypeORM, MySQL (XAMPP) |
| Auth      | JWT, bcrypt                    |
| Dev Tools | Docker, ESLint, Prettier       |

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MySQL (via XAMPP or other local MySQL server)
- Docker (optional but recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Vunas/CNPM
cd CNPM

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

#### Start MySQL with XAMPP

1. Open XAMPP Control Panel
2. Start Apache & MySQL services
3. Create a database (e.g. `pos_system`)
4. Configure `.env` file in `backend/` with your DB credentials

#### Start Backend

```bash
cd backend
npm run start:dev
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

#### Using Docker (optional)

```bash
docker-compose up --build
```

## Folder Structure

```
/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── auth/               # Authentication module (JWT, guards, etc.)
│   │   ├── config/             # Configuration helpers
│   │   ├── modules/            # Business logic modules
│   │   ├── uploads/            # File handling logic
│   │   ├── utils/              # Utility functions
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test/                   # Backend unit tests
│   ├── uploads/                # Static uploaded files
│   └── .env, package.json, tsconfig.json, ...
│
├── frontend/                   # ReactJS + Vite frontend
│   ├── public/                 # Static public assets
│   ├── out/                    # Optional build output
│   ├── src/                    # Application source
│   │   ├── api/                # Axios and backend API handlers
│   │   ├── assets/             # Static files like images, icons, etc.
│   │   ├── components/         # Reusable UI components
│   │   ├── Hooks/              # Custom React hooks
│   │   ├── pages/              # Page components (views/screens)
│   │   ├── router/             # React Router configuration
│   │   ├── utils/              # Utility functions/helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js, tailwind.config.js, ...
│
├── database/                   # SQL schema files or DB scripts
├── docker-compose.yml          # Docker configuration
└── README.md
```

## Contributing

Feel free to fork this repository, submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

📸 Screenshots
Customer UI - Home
A sleek and intuitive home interface for customers to browse menu options and place orders seamlessly.

<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img1.png" width="70%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img2.png" width="70%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img3.png" width="70%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img4.png" width="70%" /></p>

Order UI - Desktop
An efficient desktop interface for placing and managing food orders with clarity.

<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img5.png" width="70%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img6.png" width="70%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img7.png" width="70%" /></p>

Responsive Phone UI
Optimized for mobile use, ensuring smooth ordering experience on phones.

<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img8.png" width="40%" /><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img9.png" width="40%" /></p>

QR Code
Quick ordering through QR codes placed on restaurant tables.

<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img10.png" width="50%" /></p>

💳 Payment System
Secure and flexible payment processing for customers.
Supports multiple payment methods including cash, credit card, and digital wallets.

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/customer/img11.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/customer/img12.png" style="margin: 10px;" width="50%" />
</p>
- Customers can pay using cash, credit card, or e-wallets (VNPay, Momo, PayPal).
- Transaction details are processed securely to ensure accuracy and prevent fraud.
- Real-time payment confirmation displays in the system dashboard.

🧾 Invoice System
Automated invoice generation for every completed order.
Invoices ensure transparency and facilitate tracking for both customers and administrators.

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/customer/img13.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/customer/img14.png" style="margin: 10px;" width="50%" />
</p>

<p align="center">
<img src="frontend/src/assets/projects/customer/img15.png" style="margin: 5px;" width="50%" />
</p>
- Customers receive detailed invoices including order breakdown, payment method, and total amount.
- Admins can track invoices in the dashboard, ensuring proper financial management.
- Invoices can be downloaded or printed, allowing for seamless record-keeping.

Feedback System
Customers can submit reviews and provide ratings for their dining experience.

<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/customer/img16.png" width="60%" /></p>

Admin Dashboard - POS System
A powerful interface for restaurant owners and staff to manage orders, track revenue, and streamline operations.
🔐 Login Admin

## 🌐 Admin Dashboard - POS System

### 🔐 Login Admin

<p align="center">
  <img src="frontend/src/assets/projects/admin/login.png" style="margin: 10px;" width="50%" />
</p>

### 👤 User Account Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img1.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img2.png" style="margin: 10px;" width="50%" />
</p>

- Manage user roles (Admin, Staff, Kitchen).
- Register, log in, and update account information.

### 🍽️ Product Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img3.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img4.png" style="margin: 10px;" width="50%" />
</p>

- Add, edit, and delete food items.
- Categorize products into groups (Burgers, Pizza, Drinks, Rice, etc.).

### 📂 Category Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img5.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img6.png" style="margin: 10px;" width="50%" />
</p>

- Create and update food categories.
- Manage category images and visibility.

### 🏢 Restaurant Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img7.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img8.png" style="margin: 10px;" width="50%" />
</p>

- Store restaurant details such as name, address, and contact information.
- Manage dining areas and seating arrangements.

### 📌 Table Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img9.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img10.png" style="margin: 10px;" width="50%" />
</p>

- Track restaurant tables, table numbers, and QR codes for ordering.
- View table availability (Occupied, Available).

### 🛒 Order Management

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img11.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img12.png" style="margin: 10px;" width="50%" />
</p>

- Process orders and monitor their status (Pending, Confirmed, Processing, Finished, Cancelled).
- Manage payment methods (Cash, Credit Card, E-wallet).

### 📝 Customer Feedback System

<p align="center">
  <img src="frontend/src/assets/projects/admin/img13.png" style="margin: 10px;" width="50%" />
</p>

- Customers can submit reviews and ratings after completing orders.
- Display customer satisfaction metrics to improve service quality.

### 📊 Revenue & Statistics Dashboard

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img14.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img15.png" style="margin: 10px;" width="50%" />
</p>

- Generate sales reports with revenue trends.
- Identify best-selling products and order patterns (Daily/Weekly/Monthly).

🔹 Navbar Features
1️⃣ Profile Picture Change 🖼️

<p align="center" style="display: flex; justify-content: center; gap: 10px;">
  <img src="frontend/src/assets/projects/admin/img16.png" style="margin: 10px;" width="50%" />
  <img src="frontend/src/assets/projects/admin/img18.png" style="margin: 10px;" width="50%" />
</p>
Allows users to update their profile picture directly from the Navbar.
- How it works:
- Click on the Profile Picture Icon in the Navbar.
- Select Upload Image to replace the current picture.
- The new profile picture is updated and displayed immediately.
2️⃣ Logout Functionality 🔐
<p align="center"><img style="margin: 5px; margin-bottom: 20px; margin-top: 20px" src="frontend/src/assets/projects/admin/img17.png" width="50%" /></p>
Provides a secure way to log out of the system.

🙌 Thank You & Final Thoughts
Thank you all for your time and interest in this project. We sincerely appreciate your support and engagement.
We hope this system provides valuable assistance and helps simplify restaurant management operations. It has been an incredible journey to develop and refine this project, and we are excited about the possibilities for future improvements.
Your feedback and insights are always welcome as we continue to innovate and enhance the system further.
🚀 Wishing you success and efficiency in your business operations!
