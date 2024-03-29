import LoadingSpinner from '../../components/loading-spinner/loading_spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserGlobalContext } from '../../hooks/context/user';
import { useEffect, useState } from 'react';
import { ProfileTwittBox } from '../../components/profile-twitt-box/profile_twitt_box';
import { ProfileUserCard } from '../../components/profile-user-card/profile_user_card';


const userOptions = ["Tweets", "Respuestas", "Favoritos"];

function User_Profile() {

  const [activeContainer, setActiveContainer] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { user, getUser, userProfile, getTwittsByUser, twittsByUser, getCommentsByUser, getFavouritesByUser, commentsByUser, favouritesByUser, isUserLoading} = useUserGlobalContext();
  const { userId } = params;

  if (userId) {
    useEffect(() => {
      if (userId) {
        const fetchData = async () => {
          getUser(userId);
          getTwittsByUser(userId);
          getCommentsByUser(userId);
          getFavouritesByUser(userId);
        }
        fetchData()
      }
    }, [userId])
  } else {
    navigate('/home');
  }

  return (
    <>
      {
        isUserLoading && <LoadingSpinner />
      }
      {
        userProfile._id != user._id && !isUserLoading ?
        <ProfileUserCard user={user} userProfile={userProfile} />
        :
        <div className='user-profile-update-container'>
          <a href="/user/update?u=1">Actualizar datos</a>
        </div>
      }
      {
        userProfile.twitts && !isUserLoading &&
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
            {
              userOptions.map((_option, i) => (
                <ProfileTwittBox
                  userId={userId!}
                  key={i}
                  entity={i === 0 ? twittsByUser : i === 1 ? commentsByUser : favouritesByUser}
                  activeContainer={activeContainer}
                  containerIndex={i}
                />
              ))
            }
          </div>

        </main>
      }

    </>

  )
}

export default User_Profile