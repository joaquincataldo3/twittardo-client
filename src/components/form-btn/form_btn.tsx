import { CreateTwittBtnProps } from '../../utils/interfaces/props/props_interfaces';
import './form_btn.css';

export const FormBtn = (props: CreateTwittBtnProps) => {

  const {content, handleClick} = props;

  return (
    <button type='submit' className='create-tw-btn' onClick={(e) => handleClick(e)}>{content}</button>
  )
}
