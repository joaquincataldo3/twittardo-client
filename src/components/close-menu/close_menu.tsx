import { CloseMenuProps } from '../../utils/interfaces/props/props_interfaces';
import './close_menu.css';

export const CloseMenu = (props: CloseMenuProps) => {

  const {colorVar, functionToHandle} = props;

  return (
    <div className='close-menu-container'>
        <i className='bx bx-x close-menu' onClick={functionToHandle} style={{color: `var(--${colorVar})`}}></i>
    </div>
  )
}
