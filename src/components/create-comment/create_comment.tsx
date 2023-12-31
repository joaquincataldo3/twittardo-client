import { useTwittGlobalContext } from '../../hooks/context/twitts';
import { useUserGlobalContext } from '../../hooks/context/user'
import { CreateCommentProps } from '../../utils/interfaces/props/props_interfaces';
import { FormBtn } from '../form-btn/form_btn';
import { UserAvatar } from '../user-avatar/user_avatar';
import { TwittTextarea } from '../twitt-textarea/twitt_textarea';
import { TwittCharacters } from '../twitt-characters/twitt_characters';
import './create_comment.css';
import '../../style-variables/variables.css';

function Create_Comment(props: CreateCommentProps) {

  const { user } = useUserGlobalContext();
  const { createComment, twittTextareaContent, handleTextareaIsEmpty } = useTwittGlobalContext();
  const { twittId } = props;

  const handleCreateComment = (e: React.FormEvent) => {
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
  
        <FormBtn content={'Crear comentario'} handleClick={handleCreateComment} widthNum={70} additionalClassName={['margin-left-auto']}/>

      </form>

    </div>
  )
}

export default Create_Comment