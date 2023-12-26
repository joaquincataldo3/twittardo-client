
import Black_Screen from "../../components/black-screen/black_screen"
import Twitt_List from "../../components/twitt-list/twitt_list"
import Create_Twitt from "../../components/create-twitt/create_twitt"
import { useUserGlobalContext } from "../../hooks/context/user"


function Home() {

  const context = useUserGlobalContext()
  const {user } = context



  return (

    <>
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
