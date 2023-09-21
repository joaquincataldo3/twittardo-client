import { NoContentTextProps } from "../../types"

function No_Content_Text(props: NoContentTextProps) {

  const {msg} = props;

  return (
    <div>
        <p className='no-content-text'>No hay {msg} para mostrar</p>
    </div>
  )
}

export default No_Content_Text