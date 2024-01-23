import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useUserGlobalContext } from "../../hooks/context/user";
import { CommentAndFav } from "../comment-and-fav/comment_and_fav";
import Comment_Card from "../comment-card/comment-card";
import { ConfirmTwittDelete } from "../confirm-twitt-delete/confirm_twitt_delete";
import Create_Comment from "../create-comment/create_comment";
import { UserAvatar } from "../user-avatar/user_avatar";
import './single_twitt.css';


export const Single_Twitt = () => {

    const userContext = useUserGlobalContext();
    const { user } = userContext;
    const { oneTwitt } = useTwittGlobalContext();
    const { image, twitt } = oneTwitt;
  


    return (
        <>
            <div className="one-twitt-container">
                <div className={`one-twitt-wrapper ${image ? 'one-twitt-wrapper-img' : '.one-twitt-wrapper-no-img'}`}>
                    <div className={`${image?.secure_url? 'one-twitt-content-container' : 'one-twitt-content-container-no-img'}`}>
                        <div className="one-twitt-card-first-column-container">
                            <UserAvatar url={oneTwitt.user.image.secure_url} width={55} height={45} userId={oneTwitt.user._id} />
                            <div className="one-twitt-card-username-container">
                                <p>@{oneTwitt.user.username}</p>

                                <>
                                    {
                                        oneTwitt.user._id == user._id &&
                                        <ConfirmTwittDelete twittId={oneTwitt._id} />
                                    }
                                </>
                            </div>
                        </div>
                        <div className={`${image ? 'one-twitt-card-second-column-container' : 'one-twitt-card-second-column-container-no-img'}`}>
                            <div className="one-twitt-desc-container">
                                <p>{twitt}</p>
                            </div>
                            {
                                image &&
                                <div className="one-twitt-card-img-container">
                                    <img src={image?.secure_url} alt="" />
                                </div>
                            }
                        </div>
                        <div className="one-twitt-card-third-column-container">
                            <CommentAndFav twitt={oneTwitt} />
                        </div>
                    </div>
                </div>
                <div>
                    {
                        user.username &&
                        <Create_Comment twittId={oneTwitt._id} />
                    }
                </div>

                <div className='comments-container'>
                    {
                        oneTwitt.comments && oneTwitt.comments.length > 0 &&
                        oneTwitt.comments.map((comment: any) => {
                            console.log(comment)
                            return (
                                <Comment_Card commentEntity={comment} key={comment._id} />
                            )
                        })
                    }
                </div>

            </div >
        </>

    )
}
