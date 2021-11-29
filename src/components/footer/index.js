import Link from '../navLink'
import './index.css'
import getNavigation from '../../utils/navigation'
import LogoLink from '../logoLink';
// import UserContext from '../../Context'


const Footer = () => {
  //   const context = useContext(UserContext)
  //   const user = context.user
  const user = '';

  return (
    <footer className="footer-wrapper">
      <div className="logo-container-footer" >
        <span className="logo-footer">
          <LogoLink href="/home">{<img alt="logo" className="logo-img-footer" src="/logo.png" />}</LogoLink>
        </span>
        <span className="text-footer">READ ALOUD &copy; 2021</span>
      </div>
      <p>Designed and created by nradkova</p>
    </footer>
  )
}
export default Footer