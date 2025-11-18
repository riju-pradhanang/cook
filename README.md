# CookBook: Your Virtual Kitchen Assistant (Frontend Only)

CookBook is a full-featured frontend recipe app built with React + Vite. It simulates a real app without a backend using LocalStorage and a lightweight fake API layer. It includes authentication, recipes CRUD, favorites ("My Cookbook"), filtering/search, routing, and a responsive Tailwind UI.

## Tech Stack

- React (Vite)
- React Router
- Tailwind CSS
- Context API for state
- LocalStorage + custom `fakeApi`
- `react-hot-toast` for toasts

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run dev server

```bash
npm run dev
```

3) Open the URL printed in the terminal (usually http://localhost:5173)

## Fake Auth

- Demo account: email `demo@cookbook.app`, password `demo123`
- Register creates a new user and logs you in (stored in LocalStorage)

## Data Seeding

- On first load, `src/data/sampleRecipes.json` is written into LocalStorage
- Users are stored in LocalStorage under `cb_users`
- Logged-in user stored under `cb_user`
- Favorites keyed by user under `cb_favorites`

## Project Structure

```
src/
  components/
    layout/ (Navbar, Footer)
    recipes/ (RecipeCard, RecipeGrid, RecipeFilters)
    ui/ (Button, Input, TextArea, Select, Loader)
  context/ (AuthContext, RecipesContext)
  data/ (sampleRecipes.json)
  pages/ (Home, Recipes, RecipeDetails, Login, Register, AddRecipe, EditRecipe, MyCookbook, MyRecipes, Profile)
  utils/ (localStorage.js, fakeApi.js)
  App.jsx, main.jsx, index.css
```

## Notes

- This is a frontend-only app. No network calls are required.
- Tailwind warnings in editors are normal until PostCSS runs via Vite.
