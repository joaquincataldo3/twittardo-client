import { TwittCardProps } from "../../types";
import './twitt_card.css'
import '../../style-variables/variables.css'
import { Twitt_Avatar } from "../user-avatar/user_avatar";
import { CommentAndFav } from "../comment-and-fav/comment_and_fav";

function Twitt_Card(props: TwittCardProps) {

    const { twitt } = props;
    const { user } = twitt;
   
    return (
        <>
            <div className="twitt-content-container">

                <Twitt_Avatar url={user.image_url!} />
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