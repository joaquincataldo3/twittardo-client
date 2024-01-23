import { NoContentTextProps } from '../../utils/interfaces/props/props_interfaces'

export const NoContentText = (props: NoContentTextProps) => {

  const { msg } = props;

  return (
    <div>
        <p>No hay más {msg} para mostrar</p>
    </div>
  )
}
