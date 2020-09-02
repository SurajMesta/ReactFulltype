import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Signedout} from './Signedout'
import SignedIn from './SignedIn'
import './Navbar.css'

 const Navbar = () => {

   let links= sessionStorage.getItem('token')?(<SignedIn/>):(<Signedout/>)


  


    return (
        <div>
          <nav className="navbar">
            <div className="nav-div">
            <Link to="#" className="nav-icon"><i className="fab fa-react fa-3x"></i></Link>
            <h4 style={{marginLeft:'25px'}}>React-Quiz</h4>
            </div>
           
           

            <ul>
              {links}
            </ul>

            <div className="bar">
             <span><i className="fas fa-bars bar-icon"></i></span>
           </div>
          </nav>
          

          <div className="mob-div">
          <ul>
              {links}
            </ul>
          </div>

      {/* <nav className="nav-wrapper indigo">
    <div className="container">
      <Link to="#" className="brand-logo" style={{marginLeft:"20px"}}><i className="fab fa-react fa-2x"></i>ReactQuiz</Link>
      <Link to="#" className="sidenav-trigger" data-target="mobilelinks">
        <i className="material-icons">menu</i>
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
     {links}
      </ul>
    </div>
  </nav>

  <ul className="sidenav" id="mobilelinks">
    {links}
  </ul> */}
        </div>
    )
}

export default Navbar
