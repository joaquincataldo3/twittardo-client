import Twitt_List from "../../components/twitt-list/twitt_list";
import { CreateTwitt } from "../../components/create-twitt/create_twitt";
import { useUserGlobalContext } from "../../hooks/context/user";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function Home() {

  const context = useUserGlobalContext();
  const {user, handleSetPreviousLocation } = context;
  const location = useLocation();
  
  useEffect(() => {
    return () => {
      handleSetPreviousLocation(location)
    }
  }, [])

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
