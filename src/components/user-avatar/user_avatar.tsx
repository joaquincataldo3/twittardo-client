import { AvatarContainerProps } from '../../utils/interfaces/props/props_interfaces';
import './user_avatar.css';

export const UserAvatar = (props: AvatarContainerProps) => {
    
    const {url, width, height, handleFunction, userId } = props;

    const styles = {
      width,
      height
    }

    const idUser = userId ? userId : '';

    const handleClick = () => {
      if(handleFunction) {
        handleFunction(idUser);
      }
    }

    return (
    <div className='avatar-container' style={styles} onClick={handleClick}>
        <img src={url} alt={url} />
    </div>
  )
}
