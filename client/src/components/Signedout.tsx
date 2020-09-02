import React from 'react'
import {Link} from 'react-router-dom'

export const Signedout = () => {
    return (
      
            <React.Fragment>
                <li ><Link className="ul-li" to="/signin"> Login</Link></li>
                <li ><Link className="ul-li" to="/signup">Signup</Link></li>
            </React.Fragment>
       
    )
}
