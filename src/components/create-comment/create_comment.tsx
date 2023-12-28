import { useState } from 'react';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import { useUserGlobalContext } from '../../hooks/context/user'
import { CreateCommentProps, HandleCreateTwitt } from '../../types';
import { Create_Twitt_Btn } from '../create-twitt-btn/create_twitt_btn';
import { Twitt_Avatar } from '../twitt-avatar/twitt_avatar';
import '../../style-variables/variables.css';
import './create_comment.css';
import { TwittTextarea } from '../twitt-textarea/twitt_textarea';

function Create_Comment(props: CreateCommentProps) {

  const { user } = useUserGlobalContext();
  const { createComment, twittTextareaContent, handleTextareaIsEmpty } = useTwittGlobalContext();
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
      <Twitt_Avatar url={user.image_url!} />
      <form action="" className="create-comment-form">

        <TwittTextarea name='comment' />
        <Create_Twitt_Btn content={'Crear comentario'} handleClick={handleCreateComment} additionalClassname={'create-comment-btn'} />

      </form>

    </div>
  )
}

export default Create_Comment