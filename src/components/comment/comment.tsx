import { TwittCardProps } from "../../types"
import { apiUrl } from "../../utils/utils"
import './comment.css'

function Comment_Card(props: TwittCardProps) {

    const {twitt} = props;

    return (
        <div className="comment-card" key={twitt._id}>


            <div className="comment-content-container">

                <div className="comment-card-first-column-container">
                    <div className="img-container">
                        <img src={`${apiUrl}images/${twitt.user.avatar}`} alt="" />
                    </div>
                    <div className="comment-username-container">
                        <p>@{twitt.user.username}</p>
                    </div>
                </div>
                <div className="comment-card-second-column-container">
                    <div className="comment-desc-container">
                        <p>{twitt.twitt}</p>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Comment_Card