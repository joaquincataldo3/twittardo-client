import { CommentCardProps } from "../../types"
import { UserAvatar } from "../user-avatar/user_avatar";
import './comment-card.css'

function Comment_Card(props: CommentCardProps) {

    const { commentEntity } = props;
    const { user, comment } = commentEntity;

    return (
        <div className="comment-card" >
            <div className="comment-content-container">
                <div className="comment-card-first-column-container">
                    <UserAvatar url={user.image_url} width={55} height={45} />

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