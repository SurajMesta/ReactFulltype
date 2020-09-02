import React from 'react'
import {Link} from 'react-router-dom'

 const Pnf = () => {
    return (
        <div>
            <div className="card center-align">
                <div className="card-content">
                    <h2>404!!! Oops Page Not Found</h2>
                    <Link to="/signin">Return to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Pnf
