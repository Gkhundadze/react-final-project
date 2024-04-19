import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { router } from './config/routes/router'
import {RouterProvider} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleClientID } from './config/api/googleAuth'
import { FavoritesProvider } from './contexts/FavoritesContext'
import {NavigationProvider} from './contexts/NavigationContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <FavoritesProvider>
    <NavigationProvider>
    <GoogleOAuthProvider clientId={GoogleClientID}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    </NavigationProvider>
    </FavoritesProvider>
  // </React.StrictMode>,
)
