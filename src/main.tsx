import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import App from './App.tsx'
import HomePage from './screens/index.tsx'
import PizzaCount from './screens/pizzaCount.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
