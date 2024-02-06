import Twitt_List from "../../components/twitt-list/twitt_list";
import { CreateTwitt } from "../../components/create-twitt/create_twitt";
import { useUserGlobalContext } from "../../hooks/context/user";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Black_Screen from "../../components/black-screen/black_screen";



function Home() {

  const context = useUserGlobalContext();
  const {user, handleSetPreviousLocation} = context;
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  
  useEffect(() => {
    setCurrentLocation(location.pathname);
    return () => {
      if(currentLocation){
        handleSetPreviousLocation(currentLocation);
      }
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
