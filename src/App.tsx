import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import User_Login from './components/forms/user_login'
import Shared_Layout from './components/shared-layout/shared_layout'
import './App.css'

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Shared_Layout />}>
              <Route path = 'home' index element={<Home />} />

              <Route path = 'users'> 
                  <Route path = 'login' element={<User_Login />} />
              </Route>
        </Route>
      </Routes>
  
  )
}

export default App
