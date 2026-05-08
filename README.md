# 💸 Expense Tracker API

A RESTful API for managing personal expenses — built with **Node.js**, **Express**, and **MongoDB**. Users can register, log in, and manage their own expenses with full CRUD support and date-based filtering.

---

## 🚀 Features

- **JWT Authentication** — Secure registration and login; all expense routes are protected.
- **Full CRUD on Expenses** — Create, read, update, and delete your own expenses.
- **Date Filtering** — Filter expenses by:
  - Past week
  - Past month
  - Last 3 months
  - Custom date range
- **Expense Categories** — Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others.
- **User Isolation** — Each user can only access their own expenses.

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Runtime     | Node.js                     |
| Framework   | Express.js                  |
| Database    | MongoDB (via Mongoose)      |
| Auth        | JWT (jsonwebtoken) + bcryptjs |
| Dev Tools   | Nodemon, dotenv             |

---

## 📁 Project Structure

```
expense-tracker-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── constants/
│   │   └── categories.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── expense.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── expense.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── expense.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── expense.service.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── generateToken.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/harshits56/expense-tracker-api.git
cd expense-tracker-api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=2001
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=your_super_secret_key
```

### Run the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:2001`

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint    | Description              | Auth Required |
|--------|-------------|--------------------------|---------------|
| POST   | `/register` | Register a new user      | ❌            |
| POST   | `/login`    | Login and receive a JWT  | ❌            |

#### Register — `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "Harshit",
  "email": "harshit@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login — `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "harshit@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "<jwt_token>"
}
```

---

### Expense Routes — `/api/expenses`

> All routes require `Authorization: Bearer <token>` header.

| Method | Endpoint   | Description                          |
|--------|------------|--------------------------------------|
| POST   | `/`        | Create a new expense                 |
| GET    | `/`        | Get all expenses (with filters)      |
| PUT    | `/:id`     | Update an expense by ID              |
| DELETE | `/:id`     | Delete an expense by ID              |

#### Create Expense — `POST /api/expenses`

**Request Body:**
```json
{
  "title": "Monthly Internet Bill",
  "amount": 999,
  "category": "Utilities",
  "date": "2026-05-08"
}
```

#### Get Expenses with Filters — `GET /api/expenses`

Supported query parameters:

| Parameter | Description                        | Example                          |
|-----------|------------------------------------|----------------------------------|
| `filter`  | `week`, `month`, `3months`         | `?filter=week`                   |
| `start`   | Custom start date (`YYYY-MM-DD`)   | `?start=2026-01-01`              |
| `end`     | Custom end date (`YYYY-MM-DD`)     | `?end=2026-05-08`                |

**Examples:**
```
GET /api/expenses?filter=week
GET /api/expenses?filter=3months
GET /api/expenses?start=2026-01-01&end=2026-03-31
```

#### Update Expense — `PUT /api/expenses/:id`

**Request Body** (any fields to update):
```json
{
  "amount": 1200,
  "category": "Electronics"
}
```

#### Delete Expense — `DELETE /api/expenses/:id`

No body required. Returns a success message on deletion.

---

## 🗂️ Expense Categories

```
Groceries | Leisure | Electronics | Utilities | Clothing | Health | Others
```

---

## 🔐 Authentication Flow

1. **Register** a new account via `POST /api/auth/register`.
2. **Login** via `POST /api/auth/login` to receive a JWT token.
3. **Include the token** in all subsequent requests:
   ```
   Authorization: Bearer <your_token>
   ```

---

## 📦 Sample Expense Documents (MongoDB)

```json
[
  {
    "_id": "69f1c220c546191caad08e25",
    "user": "69f1c0e1c546191caad08e23",
    "amount": 200,
    "category": "Leisure",
    "description": "3 days ago",
    "date": "2026-04-26T00:00:00.000Z",
    "createdAt": "2026-04-29T08:32:32.808Z",
    "updatedAt": "2026-04-29T08:32:32.808Z"
  },
  {
    "_id": "69f1c22bc546191caad08e26",
    "user": "69f1c0e1c546191caad08e23",
    "amount": 300,
    "category": "Utilities",
    "description": "20 days ago",
    "date": "2026-04-09T00:00:00.000Z",
    "createdAt": "2026-04-29T08:32:43.193Z",
    "updatedAt": "2026-04-29T08:32:43.193Z"
  },
  {
    "_id": "69f1c237c546191caad08e27",
    "user": "69f1c0e1c546191caad08e23",
    "amount": 400,
    "category": "Clothing",
    "description": "2 months ago",
    "date": "2026-02-15T00:00:00.000Z",
    "createdAt": "2026-04-29T08:32:55.677Z",
    "updatedAt": "2026-04-29T08:32:55.677Z"
  },
  {
    "_id": "69f1c245c546191caad08e28",
    "user": "69f1c0e1c546191caad08e23",
    "amount": 500,
    "category": "Health",
    "description": "Old expense",
    "date": "2025-10-01T00:00:00.000Z",
    "createdAt": "2026-04-29T08:33:09.385Z",
    "updatedAt": "2026-04-29T08:33:09.385Z"
  }
]
```

---

## 🧪 Testing with Postman

1. Import the base URL: `http://localhost:2001`
2. Register and login to get a JWT token.
3. Add the token to the `Authorization` header as `Bearer <token>`.
4. Test all expense endpoints.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Harshit**  
Backend Developer — Node.js | Express | MongoDB  
[GitHub](https://github.com/harshits56)
