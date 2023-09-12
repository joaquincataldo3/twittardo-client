import logo from '../../assets/logo.jpg';
import { useUserGlobalContext } from '../../hooks/context/user';
import './header.css';
import { User, UserCtxt } from '../../types';
import { useLocation } from 'react-router-dom';
function Header() {

  const context: UserCtxt = useUserGlobalContext();
  const user: User = context.user;
  const toggleNavbar = context.toggleNavbar;
  const loginPathname: string = '/user/login';
  const location: string = useLocation().pathname;
 

  return (
    <header>
      <div className='header-content-container'>
        {
          user.username === '' ?
            <button className='anchor-login-container'><a href={location === loginPathname ? '#' : loginPathname}>Logueate</a></button>
            :
            <div className='user-avatar-container'  onClick={toggleNavbar} >
              <img src={user.image_url} alt="" className='user-avatar' />
            </div>

        }
        <div className='twittardo-logo-container'>
          <a href="/">
            <img src={logo} alt="Twittardo logo" className='twittardo-logo' />
          </a>   
        </div>

      </div>
    </header>
  )
}

export default Header
