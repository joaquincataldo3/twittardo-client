import logo from '../../assets/logo.jpg'
import { apiUrl } from '../../utils/utils'
import { useUserGlobalContext } from '../../hooks/context/user'
import './header.css'
import { User, UserCtxt } from '../../types'

function Header() {

  const context: UserCtxt = useUserGlobalContext()
  const user: User = context.user

  return (
    <header>
      <div className='header-content-container'>
        {
          user.username === '' ?
            <button className='login-btn'><a href="users/login">Logueate</a></button>
            :
            <div className='user-avatar-container'>
              <img src={`${apiUrl}avatars/${user.avatar}`} alt="" className='user-avatar' />
            </div>

        }
        <div className='twittardo-logo-container'>
          <img src={logo} alt="Twittardo logo" className='twittardo-logo' />
        </div>

      </div>
    </header>
  )
}

export default Header
