

import { ProfileTwittBoxProps } from '../../utils/interfaces/props/props_interfaces';
import Twitt_Card from '../twitt-card/twitt_card';
import { Twitt } from '../../utils/interfaces/entities/entities_interfaces';
import Comment_Card from '../comment-card/comment-card';
import { Comment } from '../../utils/interfaces/entities/entities_interfaces';
import { NoContentText } from '../no-content-text/no_content_text';
import './profile_twitt_box.css';
import { FetchActionBtn } from '../fetch-action-btn/fetch_action_btn';
import { useUserGlobalContext } from '../../hooks/context/user';

export const ProfileTwittBox = (props: ProfileTwittBoxProps) => {

    const { entity, activeContainer, containerIndex, userId } = props;
    const { noMoreTwitts, getMoreTwittsByUser } = useUserGlobalContext();

    const handleGetMoreTwitts = () => {
        getMoreTwittsByUser(userId);
    }

    return (
        <div className={`profile-user-content ${activeContainer == containerIndex ? 'user-content-active' : activeContainer == containerIndex - 1 ? 'user-content-left' : 'user-content-right'}`}>
            {
                entity.length > 0 ?
                    entity.map((item, i) => {
                        if ('twitt' in item) {
                            return (
                                <div className="twitt-card" key={item._id}>
                                    <Twitt_Card twitt={item as Twitt} key={item._id} length={entity.length} index={i}/>
                                </div>
                            )
                        } else {
                            return (
                                <div className="twitt-card" key={item._id}>
                                    <Comment_Card comment={item as Comment} key={item._id} length={entity.length} index={i} />
                                </div>
                            )
                        }
                    })
                    :
                    <NoContentText msg='contenido' />
            }
            <div className="fetch-btn-container">
                <FetchActionBtn state={noMoreTwitts} handleClick={() => handleGetMoreTwitts()} keepFetchingText='Mostrar más' noDataLeftText='No hay más contenido para mostrar' widthNum={70} />
            </div>
        </div>
    )
}
