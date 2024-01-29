

import { ProfileTwittBoxProps } from '../../utils/interfaces/props/props_interfaces';
import Twitt_Card from '../twitt-card/twitt_card';
import { Twitt } from '../../utils/interfaces/entities/entities_interfaces';
import Comment_Card from '../comment-card/comment-card';
import { Comment } from '../../utils/interfaces/entities/entities_interfaces';
import './profile_twitt_box.css';
import { FetchActionBtn } from '../fetch-action-btn/fetch_action_btn';
import { useUserGlobalContext } from '../../hooks/context/user';

export const ProfileTwittBox = (props: ProfileTwittBoxProps) => {

    const { entity, activeContainer, containerIndex, userId } = props;
    const { noMoreTwitts, getTwittsByUser, noMoreComments, getCommentsByUser, getFavouritesByUser, noMoreFavs } = useUserGlobalContext();

    const handleGetMoreTwitts = () => {
        getTwittsByUser(userId);
    }

    const handleGetMoreComments = () => {
        getCommentsByUser(userId);
    }

    const handleGetMoreFavourites = () => {
        getFavouritesByUser(userId);
    }

    return (
        <div className={`profile-user-content ${activeContainer == containerIndex ? 'user-content-active' : activeContainer == containerIndex - 1 ? 'user-content-left' : 'user-content-right'}`}>
            {
                entity.length > 0 &&
                entity.map((item, i) => {
                    if ('twitt' in item && item.user._id === userId) {
                        return (
                            <div className="twitt-card" key={item._id}>
                                <Twitt_Card twitt={item as Twitt} length={entity.length} index={i} />
                            </div>
                        )
                    } else if ('comment' in item) {
                        return (
                            <>
                                <div className='twitt-commented-reference-container'>
                                    <p className='twitt-commented-description'>Responde al <a href={`/twitts/${item._id}`}>twitt</a> de <a href={`/user/profile/${item.user._id}`}>{item.user.username}</a></p>
                                </div>
                                <div className="twitt-card" key={item._id}>
                                    <Comment_Card comment={item as Comment} length={entity.length} index={i} />
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <div className="twitt-card" key={item._id}>
                                <Twitt_Card twitt={item as Twitt} length={entity.length} index={i} />
                            </div>
                        )
                    }
                })
            }
            {
                containerIndex === 0 ?
                    <div className="fetch-btn-container">
                        <FetchActionBtn state={noMoreTwitts} handleClick={() => handleGetMoreTwitts()} widthNum={70} />
                    </div>
                    :
                    containerIndex === 1 ?
                        <div className="fetch-btn-container">
                            <FetchActionBtn state={noMoreComments} handleClick={() => handleGetMoreComments()} widthNum={70} />
                        </div>
                        :
                        <div className="fetch-btn-container">
                            <FetchActionBtn state={noMoreFavs} handleClick={() => handleGetMoreFavourites()} widthNum={70} />
                        </div>
            }

        </div>
    )
}
