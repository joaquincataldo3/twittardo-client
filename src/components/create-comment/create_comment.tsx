import { useTwittGlobalContext } from '../../hooks/context/twitts';
import { useUserGlobalContext } from '../../hooks/context/user'
import { CreateCommentProps, HandleCreateTwitt } from '../../types';
import { Create_Twitt_Btn } from '../create-twitt-btn/create_twitt_btn';
import { UserAvatar } from '../user-avatar/user_avatar';
import '../../style-variables/variables.css';
import './create_comment.css';
import { TwittTextarea } from '../twitt-textarea/twitt_textarea';
import { TwittCharacters } from '../twitt-characters/twitt_characters';

function Create_Comment(props: CreateCommentProps) {

  const { user } = useUserGlobalContext();
  const { createComment, twittTextareaContent, handleTextareaIsEmpty, characters} = useTwittGlobalContext();
  const { twittId } = props;

  const handleCreateComment: HandleCreateTwitt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twittTextareaContent) {
      handleTextareaIsEmpty(true);
    } else {
      handleTextareaIsEmpty(false);

      createComment(twittTextareaContent, twittId);
    }

  }

  return (
    <div className="create-comment-container">
    
        <UserAvatar url={user.image_url} width={55} height={45} />
     

      <form action="" className="create-comment-form">

      
        <TwittTextarea name='comment' />
        <TwittCharacters />
  
        <Create_Twitt_Btn content={'Crear comentario'} handleClick={handleCreateComment} />

      </form>

    </div>
  )
}

export default Create_Comment