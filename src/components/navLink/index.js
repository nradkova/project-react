import './index.css'
import {
  Link
} from 'react-router-dom'

const NavLink = ({ title, href, type }) => {
  return (
    <div data-test-id={`link-${title}`} className={`${type}-list-item`}>
      <Link to={href} className={`${type}-link`}>
        {title}
      </Link>
    </div>
  )
}

export default NavLink
