import Twitt_List from "../../components/twitt-list/twitt_list"
import { CreateTwitt } from "../../components/create-twitt/create_twitt"
import { useUserGlobalContext } from "../../hooks/context/user"


function Home() {

  const context = useUserGlobalContext()
  const {user } = context

  return (

    <>
      <main>
        {
          user.username &&
          <CreateTwitt />
        } 
        <Twitt_List />
      </main>

    </>
  )
}

export default Home
