# UserFlow — User Management Dashboard

A modern, responsive user management dashboard built with React.js, Tailwind CSS, and REST API integration.

## ✨ Features

- **Authentication** — Login page with form validation, dummy token in `localStorage`
- **Dashboard** — Stats overview, recent users, system status widget
- **Users Module** — Fetch from JSONPlaceholder API, searchable table, pagination, loading/error states
- **Add User Form** — Modal with full validation, POST to API, success toast
- **Dark Mode** — System-aware toggle, persisted to `localStorage`
- **Responsive** — Mobile-first design, collapsible sidebar, card layout on small screens

## 🚀 Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd user-management-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

### Build for production

```bash
npm run build
npm run preview
```

## 🔑 Demo Login

Use any valid email and a password of 6+ characters:
- **Email:** `admin@example.com`
- **Password:** `password`

## 🗂 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Input.jsx
│   ├── Button.jsx
│   ├── Modal.jsx
│   ├── Avatar.jsx
│   ├── Toast.jsx
│   ├── Spinner.jsx
│   ├── StatCard.jsx
│   ├── Pagination.jsx
│   ├── AddUserForm.jsx
│   └── ProtectedRoute.jsx
├── pages/             # Route-level pages
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Users.jsx
│   ├── Settings.jsx
│   └── NotFound.jsx
├── services/          # API layer
│   └── api.js         # Axios instance + userService
├── hooks/             # Custom React hooks
│   ├── useFetch.js
│   ├── useDarkMode.js
│   └── useDebounce.js
├── layouts/           # Page layout wrappers
│   └── DashboardLayout.jsx
├── utils/             # Utility functions
│   └── auth.js        # Auth helpers + validators
├── App.jsx
├── main.jsx
└── index.css
```

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Axios | HTTP client |
| Vite | Build tool & dev server |

## 🌐 API

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) as a mock REST API.

- `GET /users` — Fetch all users
- `POST /users` — Create a user (returns mocked response)

API base URL is configured via `.env`:
```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## 💡 Assumptions

- Authentication is dummy (any valid email + 6+ char password works)
- JSONPlaceholder POST simulates creation but doesn't persist data
- Pagination is client-side (all data loaded then sliced)
- Dark mode preference is persisted to `localStorage`

## 📦 Deployment

Deploy easily to [Vercel](https://vercel.com) or [Netlify](https://netlify.com):

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```
