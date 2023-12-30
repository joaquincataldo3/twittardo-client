import { UserAvatar } from "../user-avatar/user_avatar";
import { CommentAndFav } from "../comment-and-fav/comment_and_fav";
import { TwittCardProps } from '../../utils/interfaces/props/props_interfaces';
import './twitt_card.css'
import '../../style-variables/variables.css'

function Twitt_Card(props: TwittCardProps) {

    const { twitt } = props;
    const { user } = twitt;

    return (
        <>
            <div className="twitt-content-container">
                <div className="twitt-card-second-column-first-row">
                    <a href={`/twitts/${twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
                </div>
                <UserAvatar url={user.image_url!} width={55} height={45} />
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
                        twitt.image_url &&
                        <div className="twitt-card-img-container">
                            <img src={twitt.image_url} alt="" />
                        </div>
                    }
                </div>

            </div>

            <div className="twitt-card-third-column-container">
                <CommentAndFav twitt={twitt} />
            </div>
        </>
    )
}

export default Twitt_Card