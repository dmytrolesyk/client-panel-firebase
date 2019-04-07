import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Link to="/clients/add" className="btn btn-success btn-block">
      <span className="fas fa-plus"></span> New
    </Link>
  )
}

export default Sidebar