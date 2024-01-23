import logo from '../../assets/images/logo.png';
import { useUserGlobalContext } from '../../hooks/context/user';
import './header.css';
import { useLocation } from 'react-router-dom';
import { UserAvatar } from '../user-avatar/user_avatar';
import Black_Screen from '../black-screen/black_screen';
function Header() {

  const context = useUserGlobalContext();
  const { user } = context;
  const { toggleNavbar, isMobileNavbarOpen} = context;
  const loginPathname: string = '/user/login';
  const location: string = useLocation().pathname;
 

  return (
    <>
      <header>
      <div className='header-content-container'>
        {
          user.username === '' ?
            <button className='anchor-login-container'><a href={location === loginPathname ? '#' : loginPathname}>Logueate</a></button>
            :
            <UserAvatar url={user.image.secure_url} width={65} height={55} handleFunction={toggleNavbar}/>
        }
        <div className='twittardo-logo-container'>
          <a href="/home">
            <img src={logo} alt="Twittardo logo" className='twittardo-logo' />
          </a>   
        </div>
      </div>
    </header>
    <Black_Screen state={isMobileNavbarOpen} />
    </>
  
  )
}

export default Header
