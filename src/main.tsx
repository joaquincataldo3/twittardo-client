import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TwittContextProvider } from './hooks/context/twitts.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TwittContextProvider>
        <App />
      </TwittContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
