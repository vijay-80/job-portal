
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Home.css'

const Home = () => {
  return (
    <div>
        <br /><br />
      <div className="jumbotron text-center">
        <h1 className="main-heading">Find Your Dream Job</h1>
        <p className="sub-heading">Search for jobs that match your skills and goals.</p>
        <Link to='/login'>
        <Button variant='contained' >Login</Button> 
        </Link> &nbsp; &nbsp; 
        <Link to='/register'>
        <Button variant='contained' >Signup</Button>
        </Link>
      </div>
    </div>

  )
}

export default Home