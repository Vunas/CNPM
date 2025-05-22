# POS Management System

This is a full-stack Point of Sale (POS) management system built with **ReactJS + Vite** for the frontend and **NestJS** for the backend. The system provides a complete solution for managing sales, restaurants, user accounts, products, and inventory in a modern and scalable architecture.

## Reference Website Links:
- User Page: https://cnpm-rose.vercel.app
- QRCodePage: https://cnpm-rose.vercel.app/qrcodepage
- Admin Page: https://cnpm-rose.vercel.app/admin
- Sample Accounts: To facilitate testing and demonstration, the system includes the following sample accounts:
  - Administrator: admin  (Full access to manage all operations)
  - Staff: emp (Handles table and order management)
  - Chef: kit (Manages kitchen orders and preparation status) 
  - Common password for all accounts: 123456
  
  Staff members can utilize these accounts to navigate different system functionalities and ensure seamless coordination across departments.


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

## Screenshots

### Customer UI - Home

A sleek and intuitive home interface for customers to browse menu options and place orders seamlessly.

![Customer UI 1](frontend/src/assets/projects/customer/img1.png)
![Customer UI 2](frontend/src/assets/projects/customer/img2.png)
![Customer UI 3](frontend/src/assets/projects/customer/img3.png)
![Customer UI 4](frontend/src/assets/projects/customer/img4.png)

### Order UI - Desktop

An efficient desktop interface for placing and managing food orders with clarity.

![Order UI 1](frontend/src/assets/projects/customer/img5.png)
![Order UI 2](frontend/src/assets/projects/customer/img6.png)
![Order UI 3](frontend/src/assets/projects/customer/img7.png)

### Responsive Phone UI

Optimized for mobile use, ensuring a smooth ordering experience on phones.

![Phone UI 1](frontend/src/assets/projects/customer/img8.png)
![Phone UI 2](frontend/src/assets/projects/customer/img9.png)

### QR Code

Quick ordering through QR codes placed on restaurant tables.

![QR Code](frontend/src/assets/projects/customer/img10.png)

## Payment System

Secure and flexible payment processing for customers.
Supports multiple payment methods including cash, credit card, and digital wallets.

![Payment 1](frontend/src/assets/projects/customer/img11.png)
![Payment 2](frontend/src/assets/projects/customer/img12.png)

- Customers can pay using cash, credit card, or e-wallets (VNPay, Momo, PayPal).
- Transaction details are processed securely to ensure accuracy and prevent fraud.
- Real-time payment confirmation displays in the system dashboard.

## Invoice System

Automated invoice generation for every completed order.
Invoices ensure transparency and facilitate tracking for both customers and administrators.

![Invoice 1](frontend/src/assets/projects/customer/img13.png)
![Invoice 2](frontend/src/assets/projects/customer/img14.png)
![Invoice Overview](frontend/src/assets/projects/customer/img15.png)

- Customers receive detailed invoices including order breakdown, payment method, and total amount.
- Admins can track invoices in the dashboard, ensuring proper financial management.
- Invoices can be downloaded or printed for seamless record-keeping.

## Feedback System

Customers can submit reviews and provide ratings for their dining experience.

![Feedback UI](frontend/src/assets/projects/customer/img16.png)

## Admin Dashboard - POS System

### Login Admin

![Admin Login](frontend/src/assets/projects/admin/login.png)

### User Account Management

![User Management 1](frontend/src/assets/projects/admin/img1.png)
![User Management 2](frontend/src/assets/projects/admin/img2.png)

- Manage user roles (Admin, Staff, Kitchen).
- Register, log in, and update account information.

### Product Management

![Product Management 1](frontend/src/assets/projects/admin/img3.png)
![Product Management 2](frontend/src/assets/projects/admin/img4.png)

- Add, edit, and delete food items.
- Categorize products into groups (Burgers, Pizza, Drinks, Rice, etc.).

### Category Management

![Category Management 1](frontend/src/assets/projects/admin/img5.png)
![Category Management 2](frontend/src/assets/projects/admin/img6.png)

- Create and update food categories.
- Manage category images and visibility.

### Restaurant Management

![Restaurant Management 1](frontend/src/assets/projects/admin/img7.png)
![Restaurant Management 2](frontend/src/assets/projects/admin/img8.png)

- Store restaurant details such as name, address, and contact information.
- Manage dining areas and seating arrangements.

### Table Management

![Table Management 1](frontend/src/assets/projects/admin/img9.png)
![Table Management 2](frontend/src/assets/projects/admin/img10.png)

- Track restaurant tables, table numbers, and QR codes for ordering.
- View table availability (Occupied, Available).

### Order Management

![Order Management 1](frontend/src/assets/projects/admin/img11.png)
![Order Management 2](frontend/src/assets/projects/admin/img12.png)

- Process orders and monitor their status (Pending, Confirmed, Processing, Finished, Cancelled).
- Manage payment methods (Cash, Credit Card, E-wallet).

### Customer Feedback System

![Customer Feedback](frontend/src/assets/projects/admin/img13.png)

- Customers can submit reviews and ratings after completing orders.
- Display customer satisfaction metrics to improve service quality.

### Revenue & Statistics Dashboard

![Revenue Dashboard 1](frontend/src/assets/projects/admin/img14.png)
![Revenue Dashboard 2](frontend/src/assets/projects/admin/img15.png)

- Generate sales reports with revenue trends.
- Identify best-selling products and order patterns (Daily/Weekly/Monthly).

## Navbar Features

### Profile Picture Change

![Profile Change 1](frontend/src/assets/projects/admin/img16.png)
![Profile Change 2](frontend/src/assets/projects/admin/img18.png)

- Allows users to update their profile picture directly from the Navbar.
- How it works:
  - Click on the Profile Picture Icon in the Navbar.
  - Select Upload Image to replace the current picture.
  - The new profile picture is updated and displayed immediately.

### Logout Functionality

![Logout UI](frontend/src/assets/projects/admin/img17.png)

- Provides a secure way to log out of the system.

## Employee Management

![Employee Management 1](frontend/src/assets/projects/admin/img19.png)
![Employee Management 2](frontend/src/assets/projects/admin/img20.png)

- Staff Management Page Overview
Our staff management page is designed to efficiently handle both order processing and table management. With an intuitive interface, employees can oversee customer orders and monitor table statuses in real time.
Table Statuses:
The system categorizes tables into four distinct statuses:
- Active – The table is currently in use.
- Locked – The table is temporarily unavailable.
- In-use – The table is occupied with an ongoing order.
- Reserved – The table has been booked in advance.
Order Management:
Staff members can easily track and manage orders for each table, ensuring smooth service and optimized workflow.

🙌 Thank You & Final Thoughts
Thank you all for your time and interest in this project. We sincerely appreciate your support and engagement.
We hope this system provides valuable assistance and helps simplify restaurant management operations. It has been an incredible journey to develop and refine this project, and we are excited about the possibilities for future improvements.
Your feedback and insights are always welcome as we continue to innovate and enhance the system further.
🚀 Wishing you success and efficiency in your business operations!
