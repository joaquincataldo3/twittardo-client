import logo from '../../assets/logo.jpg'
import './header.css'

function Header() {
  return (
    <header>
        <div className='user-avatar-container'>
   
        </div>    
        <img src={logo} alt="Twittardo logo" />
    </header>
  )
}

export default Header
