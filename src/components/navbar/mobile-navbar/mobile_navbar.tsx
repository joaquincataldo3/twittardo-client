import { useUserGlobalContext } from '../../../hooks/context/user'
import { UserAvatar } from '../../user-avatar/user_avatar';
import './mobile_navbar.css'


function Navbar() {

  const userContext = useUserGlobalContext();
  const { user, isMobileNavbarOpen, toggleNavbar, handleLogout, getUser} = userContext;

  return (
    <>
      {
        user &&
        <div className={`navbar-container ${isMobileNavbarOpen && 'navbar-container-active'}`}>

          <div className="first-row-wrapper">
            <div className='close-mobile-navbar-container'>
              <i className='bx bx-x close-navbar' onClick={toggleNavbar}></i>
            </div>

            <div className="navbar-user-info-container">
              <UserAvatar url={user.image.secure_url} width={75} height={65} />

              <div className='username-container'>
                <p>@{user.username}</p>
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
                <li className='mobile-navbar-item'><i className='bx bx-user' ></i><a href={`/user/profile/${user._id}`} onClick={() => getUser(user._id!)}>Perfil</a></li>
                <li className='mobile-navbar-item'><i className='bx bx-bell' ></i><p>Notificaciones</p></li>
                <li className='mobile-navbar-item'><i className='bx bx-bookmark' ></i><p>Guardados</p></li>
              </ul>
            </nav>
          </div>

          <div className="second-row-wrapper">
            <p onClick={handleLogout}>Cerrar sesión</p>
          </div>

        </div>
      }
    </>
  )
}

export default Navbar
