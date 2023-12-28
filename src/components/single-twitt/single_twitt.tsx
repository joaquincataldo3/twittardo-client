import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useUserGlobalContext } from "../../hooks/context/user";
import { CommentAndFav } from "../comment-and-fav/comment_and_fav";
import Comment_Card from "../comment-card/comment-card";
import Create_Comment from "../create-comment/create_comment";
import './single_twitt.css';


export const Single_Twitt = () => {

    const userContext = useUserGlobalContext();
    const { oneTwitt } = useTwittGlobalContext();
   
    const { image, image_url, twitt } = oneTwitt;

    return (
        <div className="one-twitt-container">

            <div className={`one-twitt-wrapper ${image ? 'one-twitt-wrapper-img' : '.one-twitt-wrapper-no-img'}`}>

                <div className={`${image_url ? 'one-twitt-content-container' : 'one-twitt-content-container-no-img'}`}>

                    <div className="one-twitt-card-first-column-container">
                        <div className="one-twitt-user-avatar-container">
                            <div className="one-twitt-card-avatar-container">
                                <img src={oneTwitt.user.image_url} alt="" />
                            </div>
                        </div>

                        <div className="one-twitt-card-username-container">
                            <p>@{oneTwitt.user.username}</p>
                            <>
                                {
                                    oneTwitt.user._id == userContext.user._id || userContext.user.isAdmin == 1 &&
                                    <div className="delete-twitt-container">
                                        <i className='bx bx-trash delete-twitt'></i>
                                    </div>
                                }
                            </>
                        </div>

                    </div>
                    <div className={`${image ? 'one-twitt-card-second-column-container' : 'one-twitt-card-second-column-container-no-img'}`}>

                        <div className="one-twitt-info-container">
                            <div className="one-twitt-desc-container">
                                <p>{twitt}</p>
                            </div>
                        </div>
                        {
                            image &&
                            <div className="one-twitt-card-img-container">
                                <img src={image_url} alt="" />
                            </div>
                        }
                    </div>
                    <div className="one-twitt-card-third-column-container">
                        <CommentAndFav twitt={oneTwitt} />
                    </div>
                </div>
            </div>

            <div className='comments-container'>
                <div>
                    {
                        userContext.user.username &&
                        <Create_Comment twittId={oneTwitt._id} />
                    }
                </div>

                {
                    oneTwitt.comments && oneTwitt.comments.length > 0 &&
                    oneTwitt.comments.map(item => {
                        console.log(item.comment)
                        return (
                            <Comment_Card commentEntity={item} key={item._id} />
                        )
                    })
                }
            </div>

        </div >
    )
}
