import { AvatarContainerProps } from '../../types';
import './twitt_avatar.css';

export const UserAvatar = (props: AvatarContainerProps) => {
    
    const {url} = props;

    return (
    <div className='avatar-container'>
        <img src={url} alt={url} />
    </div>
  )
}
