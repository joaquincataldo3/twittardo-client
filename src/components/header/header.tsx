import logo from '../../assets/logo.jpg'
import './header.css'

function Header() {

  return (
    <header>
      <div className='header-content-container'>

        <div className='user-avatar-container'>

        </div>
        <div className='twittardo-logo-container'>
          <img src={logo} alt="Twittardo logo" className='twittardo-logo' />
        </div>

      </div>
    </header>
  )
}

export default Header
