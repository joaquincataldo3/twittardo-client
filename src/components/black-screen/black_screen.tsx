import './black_screen.css'
import { useUserGlobalContext } from '../../hooks/context/user'
import { UserCtxt } from '../../types'



const Black_Screen = () => {

    const context: UserCtxt = useUserGlobalContext()
    const {isMobileNavbarOpen} = context

  return (
    <div className={`black-screen ${isMobileNavbarOpen && 'black-screen-active'}`}>Black_Screen</div>
  )
}

export default Black_Screen