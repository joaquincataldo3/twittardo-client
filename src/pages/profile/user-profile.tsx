import { useUserGlobalContext } from '../../hooks/context/user';
import Twitt_Card from '../../components/twitt-card/twitt_card';
import './user-profile.css'


function User_Profile() {

  const context = useUserGlobalContext();
  const { user } = context;
  const { twitts } = user;

  return (
    <main className="user-profile-main">
      <ul className="profile-options-container">
        <li className="profile-option-li">Tweets</li>
        <li className="profile-option-li">Respuestas</li>
        <li className="profile-option-li">Favoritos</li>
      </ul>
      <div className="profile-content-container">
        {
          twitts.map((twitt, i) => {
            return (
              <Twitt_Card twitt={twitt} key={i} />

            )
          })
        }

      </div>
      <div className="profile-content-container">
        <p>Respuestas</p>
      </div>
      <div className="profile-content-container">
        <p>Favoritos</p>
      </div>
    </main>
  )
}

export default User_Profile