import { ProfileUserCardProps } from '../../utils/interfaces/props/props_interfaces';
import { UserAvatar } from '../user-avatar/user_avatar';
import LoadingSpinner from '../loading-spinner/loading_spinner';
import { useUserGlobalContext } from '../../hooks/context/user';
import { FormBtn } from '../form-btn/form_btn';
import './profile_user_card.css';

export const ProfileUserCard = (props: ProfileUserCardProps) => {

    const { user, userProfile } = props;
    const { followUser, unfollowUser, isFollowLoading} = useUserGlobalContext();
    
    const userIsFollowed = userProfile.followers.some(followers => followers._id === user._id);

    const handleFollowUser = () => {
        if (userProfile._id) {
            followUser(userProfile._id);
            window.location.reload();
        }
    }

    const handleUnfollowUser = () => {
        if (userProfile._id) {
            unfollowUser(userProfile._id);
            window.location.reload();
        }

    }

    return (
        <div className="profile-card-container">
            <div className="profile-card-first-row">
                
                <UserAvatar url={user.image.secure_url} width={55} height={50} />
        
                <div className="follow-user-container">
                    {
                            isFollowLoading ?
                            <LoadingSpinner />
                            :
                            <FormBtn handleClick={userIsFollowed ? handleUnfollowUser : handleFollowUser} content={userIsFollowed ? 'Unfollow' : 'Follow'} widthNum={100} />
                    }
                </div>
            </div>
            <p className='profile-username'>@{userProfile.username}</p>
            <div className="profile-card-second-row">
                <p><span className='purple-thing'>{userProfile.followers.length}</span> seguidores</p>
                <p><span className='purple-thing'>{userProfile.following.length} </span>seguidos</p>
            </div>
        </div>
    )
}
