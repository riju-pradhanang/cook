# CookBook – Your Virtual Kitchen Assistant 

**CookBook** is a fully-featured frontend recipe application built with **React + Vite**.  
It simulates a real full-stack app using **LocalStorage** and a custom **Fake API layer**, allowing full **CRUD operations** on recipes, **user authentication**, **favorites**, **advanced filtering**, and a beautiful responsive UI — **all without a real backend**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Live Demo**: [https://cookbook-demo.netlify.app](https://cookbook-demo.netlify.app) *

---

### Demo Login (Instant Access)

```text
Email: demo@cookbook.app
Password: demo123
```

You can also register a new account, everything is saved in LocalStorage.

## Features

### Authentication
- Login & Register forms
- Protected routes
- Persistent session (LocalStorage)
- Logout

### Recipe Management
- Add, Edit Delete recipes
- View detailed recipe page
- Track user-created recipes

### My Cookbook (Favorites)
- Save/unsave recipes per user
- Dedicated "My Cookbook" page

### Smart Filtering & Search
- Search by title
- Filter by category (Breakfast, Lunch, Dessert…)
- Filter by difficulty (Easy, Medium, Hard)
- Combine filters

### UI/UX
- Modern Tailwind CSS design
- Fully responsive (mobile-first)
- Toast notifications (React Hot Toast)

## Tech Stack

| Technology       | Purpose                       |
|------------------|-------------------------------|
| React + Vite     | Fast frontend & fast dev server |
| React Router v6  | Routing                       |
| Context API      | Global state (Auth & Recipes) |
| Tailwind CSS     | Styling                       |
| React Hot Toast  | Notifications                 |
| LocalStorage     | "Database"                    |
| Custom Fake API  | Backend simulation            |

### Project Structure

```bash
src/
├── components/
│   ├── layout/      # Navbar, Footer, Layout components
│   └── recipes/     # RecipeCard, RecipeGrid, RecipeForm, Filters, etc.
│
├── pages/           # All page components
│   ├── Home.jsx
│   ├── Recipes.jsx
│   ├── RecipeDetail.jsx
│   ├── AddRecipe.jsx
│   ├── EditRecipe.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── MyCookbook.jsx
│   ├── MyRecipes.jsx
│   └── Profile.jsx
│
├── context/         # Global state management
│   ├── AuthContext.jsx
│   └── RecipesContext.jsx
│
├── data/
│   └── sampleRecipes.json   # Initial seeded recipes
│
├── utils/
│   └── fakeApi.js           # Simulated backend with LocalStorage
│
├── App.jsx          # All routes + ProtectedRoute wrapper
├── main.jsx         # Root providers (AuthProvider, RecipesProvider) + Toaster
└── index.css        # Global styles + Tailwind base, components, utilities
```
## Installation & Run

```bash
git clone https://github.com/yourusername/cookbook.git
cd cook
npm install
npm run dev
```
- Open http://localhost:5173
### Protected Routes (Require Authentication)

These pages are only accessible when logged in.  
Unauthenticated users will be redirected to `/login`.

| Route               | Description                     |
|---------------------|---------------------------------|
| `/add`              | Add a new recipe                |
| `/edit/:id`         | Edit an existing recipe         |
| `/my-cookbook`      | Your personal favorites         |
| `/my-recipes`       | Recipes created by you          |
| `/profile`          | View and edit your profile      |

Public routes (no login needed):
- `/` → Home
- `/recipes` → All recipes
- `/recipes/:id` → Recipe detail
- `/login`
- `/register`
### Fake Backend Keys in LocalStorage

All data is persistently stored in the browser's LocalStorage under these keys:
```text
cb_recipes    → All recipes (seeded + user-created)
cb_users      → Registered users (email + hashed password)
cb_user       → Currently logged-in user object
cb_favorites  → { "user@email.com": [1, 5, 23, ...] } – user's favorite recipe IDs
cb_seeded     → Boolean flag to prevent re-seeding sample data
```
---

### Screenshots

| Login & Register                                                                 | Home Page                                                                      |
|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| ![Login](https://github.com/user-attachments/assets/6879973d-965d-4357-aa62-768cd9eb15f8)<br>![Register](https://github.com/user-attachments/assets/f3f29732-eb8a-4237-abd2-101925940b27) | ![Home](https://github.com/user-attachments/assets/ab75ebb1-5e31-4774-bb97-a83250f65950)<br> ![Recipe Detail 1](https://github.com/user-attachments/assets/65692d0b-af14-4802-bfe7-5cf311270237) |

| Recipe Details                                                                                   | Add Recipe                                                                          |
|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
|<br>![Recipe Detail 2](https://github.com/user-attachments/assets/fa9df22d-1e12-422f-8c0a-d0b70c090399) | ![Add Recipe](https://github.com/user-attachments/assets/fd5913a8-2fa8-45d2-b602-7fe2e38d09f6) |
### Future Enhancements

- Real backend with Node.js/Express + MongoDB (or Firebase)
- Image upload for recipes (Cloudinary / Firebase Storage)
- Recipe ratings & comments system
- User comments and reviews
- Dark mode toggle
- Shopping list generator
- Print recipe feature
- Progressive Web App (PWA) support
- Unit converter in ingredients

---

### Contributing

Contributions are very welcome!  
Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Suggest new recipes for the sample data

---

### License

This project is open-source and licensed under the **MIT License**.  
© 2025 https://github.com/y-kanchan

**Happy Cooking!**  
Made with passion 

---






