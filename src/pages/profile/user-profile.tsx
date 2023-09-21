import Twitt_Card from '../../components/twitt-card/twitt_card';
import LoadingSpinner from '../../components/loading-spinner/loading_spinner';
import No_Content_Text from '../../components/no-content-text/no_content_text';
import Comment_Card from '../../components/comment/comment';
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
  console.log(userProfile)

  if (userId) {
    useEffect(() => {
      setIsLoading(true);
      getUser(userId);
      setIsLoading(false);
    }, [])
  } else {
    navigate('/home');
  }


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
            <div className={`profile-user-content ${activeContainer == 0 ? 'user-content-active' : activeContainer == 1 ? 'user-content-left' : 'user-content-right'}`}>
              {
                userProfile.twitts.length > 0 ?
                  userProfile.twitts.map((twitt, i) => {
                    return (
                      <div className="twitt-card" key={twitt._id}>
                        <div className="twitt-card-second-column-first-row">
                          <a href={`/twitts/${twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
                        </div>
                        <Twitt_Card twitt={twitt} key={i} />
                      </div>
                    )
                  })
                  :
                  <No_Content_Text msg='twitts' />
              }

            </div>
            <div className={`profile-user-content ${activeContainer == 1 ? 'user-content-active' : activeContainer == 2 ? 'user-content-left' : 'user-content-right'}`}>
              {
                userProfile.comments.length > 0 ?
                  userProfile.comments.map((comment, i) => {
                    return (
                      <div className="twitt-card" key={comment._id}>
                        <div className="twitt-card-second-column-first-row">
                          <a href={`/twitts/${comment.twittCommented._id}`}>Responde al twitt de {comment.twittCommented.user.username}</a>
                        </div>
                        <Twitt_Card twitt={comment} key={i} />
                      </div>
                    )
                  })
                  :
                  <No_Content_Text msg='twitts' />
              }

            </div>
            <div className={`profile-user-content ${activeContainer == 2 ? 'user-content-active' : activeContainer == 0 ? 'user-content-left' : 'user-content-right'}`}>
              <p>Favoritos</p>
            </div>
          </div>

        </main>
      }

    </>

  )
}

export default User_Profile