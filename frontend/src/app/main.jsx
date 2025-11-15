import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import App from './App.jsx'
import Home from '../components/Home.jsx'
import LandingPageFeira from '../components/LandingPageFeira.jsx'
import LandingPageFeirante from '../components/LandingPageFeirante.jsx'

// Configura o roteador da aplicacao web, definindo qual componente sera renderizado, dependendo da rota chamada pelo usuario
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/landingpagefeira/:id',
        element: <LandingPageFeira />
      },
      {
        path: '/landingpagefeirante/:id',
        element: <LandingPageFeirante />
      },
    ]
  }
])

// Criando o DOM utilizando o roteador criado acima
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
