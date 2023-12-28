import { AvatarContainerProps } from '../../types';
import './user_avatar.css';

export const UserAvatar = (props: AvatarContainerProps) => {
    
    const {url, width, height, handleFunction} = props;

    const styles = {
      width,
      height
    }

    return (
    <div className='avatar-container' style={styles} onClick={handleFunction && handleFunction}>
        <img src={url} alt={url} />
    </div>
  )
}
