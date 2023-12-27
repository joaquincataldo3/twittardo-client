import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TwittContextProvider } from './hooks/context/twitts.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserContextProvider } from './hooks/context/user.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <TwittContextProvider>
          <App />
        </TwittContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
