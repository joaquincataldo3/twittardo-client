import { ErrorProps } from '../../utils/interfaces/error/error_interfaces';
import './error_container.css';

export const ErrorContainer = (props: ErrorProps) => {

  const {message} = props;

  return (
    <div className='error-container'>
        <p>{message}</p>
    </div>
  )
}
