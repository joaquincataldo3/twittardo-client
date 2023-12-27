import { CreateTwittBtnProps } from "../../types";
import './create_twitt_btn.css';

export const Create_Twitt_Btn = (props: CreateTwittBtnProps) => {

  const {content, handleClick, additionalClassname} = props;

  return (
    <button type='submit' className={`create-tw-btn ${additionalClassname}`} onClick={(e) => handleClick(e)}>{content}</button>
  )
}
