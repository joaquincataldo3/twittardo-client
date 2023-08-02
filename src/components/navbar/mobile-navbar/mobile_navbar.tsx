import { useUserGlobalContext } from '../../../hooks/context/user'
import { useTwittGlobalContext } from '../../../hooks/context/twitts'
import { TwittState, User, UserCtxt } from '../../../types'
import { apiUrl } from '../../../utils/utils'
import './mobile_navbar.css'


function Navbar() {

  const userContext: UserCtxt = useUserGlobalContext()!
  const user: User = userContext.user
  const {isMobileNavbarOpen} = userContext
  const toggleNavbar = userContext.toggleNavbar
  
  const twittContext: TwittState = useTwittGlobalContext()!
  const {fetchOneTwitt} = twittContext
  return (
    <>
      {
        user.username &&
        <div className={`navbar-container ${isMobileNavbarOpen && 'navbar-container-active'}`}>

          <div className='close-mobile-navbar-container'>
            <i className='bx bx-x close-navbar' onClick={toggleNavbar}></i>
          </div>

          <div className="navbar-user-info-container">
            <div className="navbar-user-avatar-container">
              <img className='navbar-user-avatar' src={`${apiUrl}images/${user.avatar}`} alt="" />
            </div>

            <div className='username-container'>
              <p>{user.username}</p>
            </div>

            <div className="user-stats-container">
              <div className="user-followers">
                <p><span>{user.followersNumber}</span> seguidores</p>
              </div>
              <div className="user-following">
                <p><span>{user.followingNumber}</span> seguidos</p>
              </div>
            </div>
          </div>

          <nav className="mobile-navbar">
            <ul>
              <li className='mobile-navbar-item'><a href="/user/profile" onClick={() => fetchOneTwitt(user._id)}></a><i className='bx bx-user' ></i></li>
              <li className='mobile-navbar-item'><i className='bx bx-bell' ></i><p>Notificaciones</p></li>
              <li className='mobile-navbar-item'><i className='bx bx-bookmark' ></i><p>Guardados</p></li>
            </ul>
          </nav>
        </div>
      }
    </>
  )
}

export default Navbar
