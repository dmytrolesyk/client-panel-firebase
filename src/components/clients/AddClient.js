import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  }

  onSubmit = (e) => {
    e.preventDefault()
    const newClient = this.state
    const { firestore, history } = this.props
    if(!newClient.balance) {
      newClient.balance = 0
    }
    firestore.add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'))
    
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <span className="fas fa-arrow-circle-left"></span> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card mb-5">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  minLength="2"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  minLength="2"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={this.state.phone}
                  minLength="10"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balace</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  value={this.state.balance}
                  onChange={this.onChange}
                />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(AddClient)