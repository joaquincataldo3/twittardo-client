import { CommentProps } from "../../types"
import { apiUrl } from "../../utils/utils"
import './comment.css'

function Comment_Card(comment: CommentProps) {
    return (
        <div className="comment-card" key={comment.comment._id}>


            <div className="comment-content-container">

                <div className="comment-card-first-column-container">
                    <div className="img-container">
                        <img src={`${apiUrl}images/${comment.comment.user.avatar}`} alt="" />
                    </div>
                    <div className="comment-username-container">
                        <p>@{comment.comment.user.username}</p>
                    </div>
                </div>
                <div className="comment-card-second-column-container">
                    <div className="comment-desc-container">
                        <p>{comment.comment.comment}</p>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Comment_Card