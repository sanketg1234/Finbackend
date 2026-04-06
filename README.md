# Finance Data Processing & Access Control Backend
A secure, RESTful backend API built with Node.js and Express for managing financial records. This application features strict Role-Based Access Control (RBAC), secure JWT authentication, and advanced MongoDB aggregation pipelines to generate real-time financial dashboards.

# Key Features
Authentication: Secure user registration and login using JSON Web Tokens (JWT) and bcryptjs password hashing.
Role-Based Access Control (RBAC):
  Viewer: Can only view the aggregated dashboard summaries.
  Analyst: Can view the dashboard summaries and the raw list of financial records.
  Admin: Full access. Can create, update, and delete records, as well as manage user accounts and statuses.
  
Financial Management: Complete CRUD operations for financial income and expense tracking.

Dashboard Aggregation: Utilizes MongoDB `$aggregate` pipelines to efficiently calculate total income, total expenses, net balance, category breakdowns, and monthly financial trends.

Scurity: Account deactivation checks built directly into the authentication middleware.

## Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB
ODM: Mongoose
Security: `jsonwebtoken` (JWT), `bcryptjs`, `cors`

## 💻 Local Setup & Installation
 1. Prerequisites
Ensure you have the following installed on your machine:
 Node.js
 MongoDB
  
 2. Clone the Repository & Install Dependencies
```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
```
3.Environment Variables
create .env file and add
PORT=5000,
MONGO_URI=your_mongodb_connection_string,
JWT_SECRET=your_super_secret_jwt_key,

4.start server
```bash
npm run dev
```

## Folder Strecture
/backend
├── config/
│   └── db.js
├── controllers/
│   ├── dashboard.controller.js
│   ├── record.controller.js   
│   └── user.controller.js  
├── middlewares/
│   └── auth.middleware.js     
├── models/
│   ├── record.model.js       
│   └── user.model.js        
├── routes/
│   ├── dashboard.routes.js   
│   ├── record.routes.js      
│   └── user.routes.js        
├── .env                      
├── index.js
├── .gitignore                 
└── package.json
