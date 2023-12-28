import { CommentCardProps } from "../../types"
import './comment-card.css'

function Comment_Card(props: CommentCardProps) {

    const { commentEntity } = props;
    const { user, comment } = commentEntity;

    const apiUrl = process.env.REACT_APP_API_URL;

    // TODO - DO IMAGE URL

    return (
        <div className="comment-card" >

            <div className="comment-content-container">

                <div className="comment-card-first-column-container">
                    <div className="img-container">
                        <img src={`${apiUrl}images/${user.avatar}`} alt="" />
                    </div>

                </div>
                <div className="comment-card-second-column-container">
                    <div className="comment-username-container">
                        <p>@{user.username}</p>
                    </div>
                    <div className="comment-desc-container">
                        <p>{comment}</p>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Comment_Card