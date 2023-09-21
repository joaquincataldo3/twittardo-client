import Twitt_Card from '../../components/twitt-card/twitt_card';
import LoadingSpinner from '../../components/loading-spinner/loading_spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserGlobalContext } from '../../hooks/context/user';
import { useEffect, useState } from 'react';
import './user-profile.css'


function User_Profile() {

  const [isLoading, setIsLoading] = useState(false);
  const [activeContainer, setActiveContainer] = useState(0);
  const navigate = useNavigate();
  const context = useUserGlobalContext();
  const params = useParams();
  const { getUser, userProfile } = context;
  const { userId } = params;
  const userOptions = ["Tweets", "Respuestas", "Favoritos"]

  if (userId) {
    useEffect(() => {
      setIsLoading(true);
      getUser(userId);
      setIsLoading(false);
    }, [])
  } else {
    navigate('/home');
  }

 // TODO - ESTABLISH CONDITIONS


  return (
    <>
      {
        isLoading && <LoadingSpinner />
      }
      {
        !isLoading && userProfile &&
        <main className="user-profile-main">
          <ul className="profile-options-container">
            {userOptions.map((option, index) => (
              <li
                key={index}
                className={`profile-option-li ${index === activeContainer ? 'profile-options-li-active' : ''}`}
                onClick={() => setActiveContainer(index)}>
                {option}
              </li>
            ))}
          </ul>
          <div className="profile-content-container">
            {<div className={`profile-user-content ${activeContainer == 0 ? 'user-content-active': activeContainer == 1 ? 'user-content-left' : 'user-content-right'}`}>
              {
                userProfile.twitts.map((twitt, i) => {
                  return (
                    <Twitt_Card twitt={twitt} key={i} />
                  )
                })
              }

            </div>}
            <div className={`profile-user-content ${activeContainer == 1 ? 'user-content-active': activeContainer == 2 ? 'user-content-left' : 'user-content-right'}`}>
              <p>Respuestas</p>
            </div>
            <div className={`profile-user-content ${activeContainer == 2 ? 'user-content-active': activeContainer == 0 ? 'user-content-left' : 'user-content-right'}`}>
              <p>Favoritos</p>
            </div>
          </div>

        </main>
      }

    </>

  )
}

export default User_Profile