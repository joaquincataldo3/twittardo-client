import {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import User_Login from './components/forms/user_login'
import One_Twitt from './components/one-twitt/one_twitt'
import Shared_Layout from './components/shared-layout/shared_layout'
import { useUserGlobalContext } from './hooks/context/user'
import './App.css'

function App() {

  const context = useUserGlobalContext()
  const {checkLogin} = context

  useEffect(() => {
    checkLogin()
  }, [])


  return (

    <Routes>


      <Route path='home' index element={<Home />} />

      <Route path='user' element={<Shared_Layout />}>
        <Route path='login' element={<User_Login />} />
        {/* <Route path='profile' element={<User_Profile />} /> */}
      </Route>

      <Route path='twitts' element={<Shared_Layout />}>
        <Route path=':twittId' element={<One_Twitt/>} />
      
      </Route>



    </Routes>

  )
}

export default App
