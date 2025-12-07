import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/intro.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { RecipesProvider } from './context/RecipesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipesProvider>
          <App />
          <Toaster position="top-center" />
        </RecipesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
