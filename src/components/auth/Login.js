import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault()

    const { firebase } = this.props
    const { email, password } = this.state
    firebase.login({
      email,
      password
    })
      .catch(e => alert(e))

  }

  render() {
    const { email, password } = this.state
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 bt-3">
                <span className="text-primary">
                  <span className="fas fa-lock"></span>{' '}
                  Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default firebaseConnect()(Login)

