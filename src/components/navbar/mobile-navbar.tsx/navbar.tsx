/* import { useState } from "react" */

function Navbar() {

  /*   const [navOptionList, setNavOptionList] = useState
    const [navOptionActive, setNavOptionActive] = useState() */

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
