import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <nav className="navbar">
      <div className="div">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <button onClick={onClickLogout} className="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
