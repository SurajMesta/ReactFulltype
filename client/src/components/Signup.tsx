import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Link,Redirect} from 'react-router-dom'
 




 const Signup = ()=> {
  const history=useHistory()

    const[firstname,setFirstname]=useState("")
    const[lastname,setLastname]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[msg,setMsg]=useState(null)

    const handleSubmit=(e:any)=>{
        e.preventDefault()
       

       

        fetch('/signup',{
            method:'POST',
        
         
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                firstname,
                lastname,
                email,
                password,

            })
           
          
        }).then((res)=> res.json()).then((data)=>{
          console.log(data)
           M.toast({html:data.message,classes:'#43a047 green darken-1'})
            setMsg(data.message)
              
            if(data.message=="Signup Success"){
              setTimeout(()=>{
                 history.push('/signin')
                 window.location.reload()
              },5000)
            }
            else{
              setTimeout(()=>{
                setMsg(null)
              },3000)
            }

            

            
          
        }).catch((err)=>{
            console.log(err)
        })
        

    }

    const handleFname=(e:any)=>{
      setFirstname(e.target.value)

    }
    const handleLname=(e:any)=>{
      setLastname(e.target.value)

    }
    const handleEmail=(e:any)=>{
      setEmail(e.target.value)

    }
    const handlePassword=(e:any)=>{
      setPassword(e.target.value)

    }
    const handleMsg=(val:any)=>{
      setMsg(val)

    }

   if(sessionStorage.getItem('token')) return <Redirect to="/root"/>

 
    return (

      <div className="container" id="sign-cont">
          
        <div className="col s12" id="sign-div">
        {msg!==null?(<div className="center-align"><em >{msg}</em></div>):(null)}
       <br/>
          <form onSubmit={(e)=>{
              handleSubmit(e)
          }}>

         <div className="center-align">
         <i className="fas fa-user-plus fa-3x center-align"></i>
         </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="">Firstname:</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  autoFocus
                  value={firstname}
                   onChange={(e)=>{
                     handleFname(e)
                   }}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="">Lastname:</label>
                <input type="text" name="lastname" placeholder="Lastname" value={lastname}  onChange={(e)=>{
                   handleLname(e)
                }}/>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <label htmlFor="">Email:</label>
                <input
                  type="text"
                  name="email"
                  placeholder="someone@example.com"
                  value={email} onChange={(e)=>{
                      handleEmail(e)
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <label htmlFor="">Password:</label>
                <input type="password" name="password"  id="pass-show" value={password} onChange={(e)=>{
                    handlePassword(e)
                }}/>
              </div>
            </div>
            <div className="row">
              <div className="left-align">
              <label>
        <input type="checkbox" className="filled-in chk-pass" />
        <span>Show Password</span>
      </label> 
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                <Link to="/signin">Already Have an Account?</Link>
              </div>
            </div>

            <div className="row center-align">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              onClick={()=>{
                "M.toast({html: this.state.msg})"
              }}>
                Submit
              </button>

              
            </div>
          </form>
        </div>
      </div>
    );
  
}

export default Signup
