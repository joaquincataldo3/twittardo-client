import { CreateTwittBtnProps } from '../../utils/interfaces/props/props_interfaces';
import './btn.css';

export const FormBtn = (props: CreateTwittBtnProps) => {

  const {content, handleClick, additionalClassName, widthNum} = props;

  // sending classnames
  const additionalClassNamesString = additionalClassName ? additionalClassName.join(' ') : '';

  return (
    <button type='submit' className={`form-btn ${additionalClassNamesString}`} style={{width: `${widthNum}%`}} onClick={(e) => handleClick(e)}>{content}</button>
  )
}
