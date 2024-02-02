
import Home from './pages/home/home';
import User_Login from './components/login_form/user_login';
import One_Twitt from './pages/one-twitt/one_twitt';
import Shared_Layout from './components/shared-layout/shared_layout';
import User_Profile from './pages/profile/user-profile';
import { Routes, Route } from 'react-router-dom';
import { useUserGlobalContext } from './hooks/context/user';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/register-form/register_form';


function App() {

  const location = useLocation();
  const { checkLogin, user} = useUserGlobalContext();

  useEffect(() => {
    checkLogin();
  }, [location]);

  return (

    <Routes>
      <Route path='home' element={<Shared_Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='user' element={<Shared_Layout />}>
        <Route path='login' element={<User_Login />} />
        <Route path='profile/:userId' element={<User_Profile />} />
        {
          !user._id &&
          <Route path='register' element={<RegisterForm />}/>
        }
      </Route>

      <Route path='twitts' element={<Shared_Layout />}>
        <Route path=':twittId' element={<One_Twitt />} />
      </Route>



    </Routes>

  )
}

export default App
