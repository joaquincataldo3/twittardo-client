import logo from '../../assets/logo.jpg'
import { useUserGlobalContext } from '../../hooks/context/user'
import './header.css'

function Header() {

  const {user} = useUserGlobalContext()
  console.log(user)

  return (
    <header>
      <div className='header-content-container'>
        {
          user.username === '' ?
            <button className='login-btn'><a href="users/login">Logueate</a></button>
            :
            <div className='user-avatar-container'>
              <img src={user.avatar} alt="" />
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
