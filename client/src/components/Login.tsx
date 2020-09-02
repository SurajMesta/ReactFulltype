import React, { useState} from "react";
import {useHistory} from 'react-router-dom'
import {Link,Redirect} from 'react-router-dom'



const Login =()=> {
  const history=useHistory()

 const[email,setEmail]=useState("")
 const[password,setPassword]=useState("")
 const[msg,setMsg]=useState(null)
 const[logsucess,setLogsucess]=useState<any>(null)

 const setEmailCh=(e:any)=>{
   setEmail(e.target.value)

 }

 const setPassCh=(e:any)=>{
   setPassword(e.target.value)

 }

   const onHandleSubmit=(e:any)=>{
        e.preventDefault()


        fetch('/signin',{
          method:'POST',
          headers:{
            'Accept':"application/json",
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            email,
            password,
          })
        }).then((res)=> res.json()).then((data)=> {

          if(data.message){
            setMsg(data.message)
            M.toast({html:data.message,classes:'#43a047 green darken-1'})
            setTimeout(()=>{
              setMsg(null)
            },3000)

          }
          else{
            console.log(data.token)
            setLogsucess('Login Success')
            M.toast({html:'Login Success',classes:'#43a047 green darken-1'})
            sessionStorage.setItem("token",data.token)
            setTimeout(()=>{
             
              history.push('/root')
              window.location.reload()
            },3000)


            
          }
   

        }
       
         
       
        
        
        ).catch((err)=> console.log(err))

    }
    if(sessionStorage.getItem('token')) return <Redirect to="/root"/>

    return (
      
        <div className="container">
          <div className="col s12" id="log-div">
            <div className="center-align">
            {msg!==null?(<em>{msg}</em>):(logsucess)}
            </div>
        
            <form onSubmit={(e)=>{
                onHandleSubmit(e)

            }}>

            <div className="center-align">
            <i className="fas fa-sign-in-alt fa-3x"></i>
         </div>
              <div className="row">
                <div className="input-field">
                
                  
                  <input
                  
                  
                    type="text"
                  
                    placeholder="abc@someone.com"
                    name="email"
                    autoFocus
                    onChange={(e)=>{
                  setEmailCh(e)
                    }}
                  />
                  <label htmlFor="">Email:</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <label htmlFor="">Password</label>
                  <input type="password" className="pass-showlog" name="password" onChange={(e)=>{
                     setPassCh(e)

                  }}/>
                </div>
              </div>

              <div className="row">
              <div className="left-align">
              <label>
        <input type="checkbox" className="filled-in chk-log" />
        <span>Show Password</span>
      </label> 
              </div>
            </div>

              <div className="row">
                <div className="center-align">
                  <Link to="/forgot" onClick={()=>{
                   
                  }}>Forgot Password</Link>

                </div>
              </div>

              <div className="row">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      
    );
  
}

export default Login
