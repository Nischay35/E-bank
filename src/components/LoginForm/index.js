import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
class LoginForm extends Component {
  state = {userIdInput: '', pinInput: '', showSubmitErr: false, errMsg: ''}
  onChangeUserId = event => {
    this.setState({userIdInput: event.target.value})
  }
  onChangePin = event => {
    this.setState({pinInput: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30,path:"/"})
    history.replace('/')
  }
  onShowErrMsg = errMsg => {
    const {userIdInput, pinInput} = this.state
    if (userIdInput === '') {
      this.setState({showSubmitErr: true, errMsg})
    } else if (pinInput === '') {
      this.setState({showSubmitErr: true, errMsg: 'Invalid PIN'})
    }
  }
  submitForm = async event => {
    event.preventDefault()
    const {userIdInput, pinInput} = this.state
    const userDetails = {userIdInput, pinInput}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onShowErrMsg(data.error_msg)
    }
  }
  renderForm = () => {
    const {userIdInput, pinInput} = this.state
    return (
      <div className="formin">
        <form className="forms" onSubmit={this.submitForm}>
          <label htmlFor="user" className="label">
            User ID
          </label>
          <input
            type="text"
            id="user"
            value={userIdInput}
            onChange={this.onChangeUserId}
            placeholder="Enter User ID"
          />
          <label htmlFor="pin" className="label">
            PIN
          </label>
          <input
            type="password"
            id="pin"
            value={pinInput}
            onChange={this.onChangePin}
            placeholder="Enter PIN"
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    )
  }
  render() {
    const {showSubmitErr, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="image"
          />
          <h1 className="heading">Welcome Back!</h1>
          {this.renderForm()}
          {showSubmitErr && <p className="err">*{errMsg}</p>}
        </div>
      </div>
    )
  }
}
export default LoginForm
