
import Black_Screen from "../../components/black-screen/black_screen"
import Header from "../../components/header/header"
import Mobile_Navbar from '../../components/navbar/mobile-navbar/mobile_navbar'
import Twitt_List from "../../components/twitt-list/twitt_list"
import Create_Twitt from "../../components/create-twitt/create_twitt"
import { useUserGlobalContext } from "../../hooks/context/user"


function Home() {

  const context = useUserGlobalContext()
  const {user } = context



  return (

    <>
      <Header />
      <Mobile_Navbar />
      <Black_Screen />
      <main>
        {
          user.username &&
          <Create_Twitt />
        } 
        <Twitt_List />
        
      </main>

    </>
  )
}

export default Home
