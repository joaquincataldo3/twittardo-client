import './black_screen.css'
import {  } from '../../hooks/context/user'
import { BlackScreenProps } from '../../utils/interfaces/props/props_interfaces';



const Black_Screen = (props: BlackScreenProps) => {

   const {state} = props;

  return (
    <div className={`black-screen ${state && 'black-screen-active'}`}></div>
  )
}

export default Black_Screen