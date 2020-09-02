import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

 const SignedIn = (props:any) => {
     console.log(props.getS)
     const history=useHistory()
    return (
       
           <React.Fragment>
            <li ><Link className="ul-li" to="#" onClick={()=>{
                sessionStorage.removeItem('token')
                setTimeout(()=>{
                history.push('/signin')
               
                window.location.reload()
                },2000)
                M.toast({html:'Logged-Out Successfully',classes:'#43a047 green darken-1'})
            }}>Logout</Link></li>
    <li><Link to="#" className="btn-floating btn-large waves-effect waves-light red ul-li"><i className="material-icons">{props.getS}</i></Link></li>   
               
            </React.Fragment> 
        
    )
}

const mapStateToProps=(state:any)=>{

    return{
        getS:state.getN.initials
    }

}

export default connect(mapStateToProps)(SignedIn)
