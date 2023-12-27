import { useUserGlobalContext } from '../../hooks/context/user'
import { HandleCreateTwitt } from '../../types';
import { Create_Twitt_Btn } from '../create-twitt-btn/create_twitt_btn';
import { Twitt_Avatar } from '../twitt-avatar/twitt_avatar';
import './create_comment.css'

function Create_Comment() {

  const {user} = useUserGlobalContext();
  
  const handleCreateComment: HandleCreateTwitt = (e: React.FormEvent) => {
    e.preventDefault();
    
  }

  return (
    <div className="create-comment-container">
      <Twitt_Avatar url={user.image_url!} />
      <form action="" className="create-comment-form">

        <textarea name="twitt" id="" cols={30} rows={5} placeholder="Que estás pensando?"></textarea>
        <Create_Twitt_Btn content={'Crear comentario'} handleClick={handleCreateComment} additionalClassname={'create-comment-btn'} />
        
      </form>

    </div>
  )
}

export default Create_Comment