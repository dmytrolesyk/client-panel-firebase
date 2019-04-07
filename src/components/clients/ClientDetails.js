import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  balanceSubmit = (e) => {
    e.preventDefault()
    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }
    // Update in firestore
    firestore.update({ collection: 'clients', doc: client.id}, clientUpdate)
  }

  onDeleteClick = () => {
    const { client, firestore, history } = this.props
    firestore.delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'))
  }

  render() {
    const { client } = this.props
    const { showBalanceUpdate, balanceUpdateAmount } = this.state
    let balanceForm = ''  
    //If balance form should display
    if(showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input group-append">
              <input className="btn btn-outline-dark" type="submit" value="Update"/>
            </div>
          </div>
        </form>
      )
    } else {
      balanceForm = null
    }
    if(client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <span className="fas fa-arrow-circle-left"></span> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/clients/edit/${client.id}`}
                  className="btn btn-dark"
                >
                Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr/>
          <div className="card">
            <div className="card-header">
              <h3>{client.firstName} {client.lastName}</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client ID: <span className="text-secondary">{client.id}</span></h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h4 className="float-right">Balance:{' '}
                    <span className={classnames({
                      'text-danger': parseFloat(client.balance),
                      'text-success': !parseFloat(client.balance)
                    })}>
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{' '}
                    <small>
                      <a href="#!" onClick={() => this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate })}>
                        <span className="fas fa-pencil-alt"></span>
                      </a>
                    </small>
                  </h4>
                  {balanceForm}
                </div>
              </div>
              <hr/>

              <ul className="list-group">
                <li className="list-group-item">
                  <span className="text-secondary">Contact Email:</span> {client.email}
                </li>
                <li className="list-group-item">
                  <span className="text-secondary">Contact Phone:</span> {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(props => [{
    collection: 'clients',
    storeAs: 'client',
    doc: props.match.params.id,
  }]),
  connect(({ firestore: { ordered } }) => ({
    client: ordered.client && ordered.client[0],
  }))
)(ClientDetails)
