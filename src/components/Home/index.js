import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from "../Header"
const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home">
      <Header />
      <div className="con">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="image"
        />
      </div>
    </div>
  )
}
export default Home
