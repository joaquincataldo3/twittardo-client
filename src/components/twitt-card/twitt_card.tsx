import { UserAvatar } from "../user-avatar/user_avatar";
import { CommentAndFav } from "../comment-and-fav/comment_and_fav";
import { TwittCardProps } from '../../utils/interfaces/props/props_interfaces';
import { useUserGlobalContext } from "../../hooks/context/user";
import './twitt_card.css'
import '../../style-variables/variables.css'

function Twitt_Card(props: TwittCardProps) {

    const { twitt, length, index} = props;
    const { user } = twitt;
    const { redirectUserProfile } = useUserGlobalContext();

    return (
        <div className={`twitt-card-container ${index && length && index === length && - 1 && 'no-border-bottom'} `}>
            <div className="twitt-content-container">

                <UserAvatar url={user.image.secure_url} width={55} height={45} handleFunction={redirectUserProfile} userId={user._id}/>
                <div className="twitt-card-second-column-container">

                    <div className="twitt-card-user-info">
                        <p>@{user.username}</p>
                    </div>

                    <div className="twitt-info-container">
                        <div className="twitt-desc-container">
                            <p>{twitt.twitt}</p>
                        </div>
                    </div>
                    {
                        twitt.image &&
                        <div className="twitt-card-img-container">
                            <img src={twitt.image.secure_url} alt="" />
                        </div>
                    }
                </div>
                <div className="twitt-card-second-column-first-row">
                    <a href={`/twitts/${twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
                </div>
            </div>

            <div className="twitt-card-third-column-container">
                <CommentAndFav twitt={twitt} />
            </div>
        </div>
    )
}

export default Twitt_Card