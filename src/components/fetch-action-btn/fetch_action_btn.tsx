import { FetchActionBtnProps } from '../../utils/interfaces/props/props_interfaces';
import { MouseEvent } from 'react';
import '../form-btn/btn.css';

export const FetchActionBtn = (props: FetchActionBtnProps) => {

  const {keepFetchingText, noDataLeftText, state, handleClick, additionalClassName, widthNum} = props;
  // sending classnames
  const additionalClassNamesString = additionalClassName ? additionalClassName.join(' ') : '';

  return (
    <button type='submit' className={`form-btn ${additionalClassNamesString}`} style={{width: `${widthNum}%`, pointerEvents: `${state? 'none' : 'all'}`}} onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e)}>{state ? noDataLeftText : keepFetchingText}</button>
  )
}