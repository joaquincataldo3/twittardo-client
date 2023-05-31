import { useUserGlobalContext } from '../../../hooks/context/user'
import './header.css'
import { User, UserCtxt } from '../../../types'


function Navbar() {

  const context: UserCtxt = useUserGlobalContext()
  const user: User = context.user

  return (
    <div className="navbar-container">
      <div className="user-info-container">
        <div className="user-avatar-container">

        </div>
        <div className="user-stats-container">
            <div className="user-followers">

            </div>
            <div className="user-following">

            </div>
        </div>
      </div>

      <nav className="mobile-navbar">
        <ul>
          <li>Inicio</li>
          <li>Notificaciones</li>
          <li>Guardados</li>
          <li>Perfil</li>
        </ul>
      </nav>
    </div>

  )
}

export default Navbar
