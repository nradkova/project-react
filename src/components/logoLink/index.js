import './index.css'
import {
  Link
} from 'react-router-dom'

const LogoLink = (props) => {
  return (
      <Link to="/home" >
       {props.children}
      </Link>
  )
}

export default LogoLink