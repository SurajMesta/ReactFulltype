import React,{useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'

export const Reset = () => {
    const[pass1,setPass1]=useState<any>("")
    const[pass2,setPass2]=useState<any>("")

    const handlePass1=(val:any)=>{
        setPass1(val)

    }
    const handlePass2=(val:any)=>{
        setPass2(val)

    }
    const {token}=useParams()
    const history=useHistory()

    const onHandleChange=(e:any)=>{
        e.preventDefault()
       
        console.log(token)

        fetch('/resetpass',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                pass1,
                pass2,
                token,
            })
        }).then((res)=> res.json()).then((data)=>{
            console.log(data)

            if(data.error){
                M.toast({html:data.error,classes:'#43a047 green darken-1'})
             
                
            }
            else{
                M.toast({html:data.message,classes:'#43a047 green darken-1'})

                setTimeout(()=>{
                history.push('/signin')
    
                },5000)

            }
         
        }).catch((err)=>{
            console.log(err)
        })


    }
    return (
        <div id="reset-div">
            <form onSubmit={(e)=>{
                onHandleChange(e)

            }}>
                <div className="row">
                    <div className="input-field">
                        <label htmlFor="">Enter New Password</label>
                          <input type="password" className="reset-pass" autoFocus value={pass1} onChange={(e)=>{
                              handlePass1(e.target.value)
                          }}/>  
                    </div>

                </div>

                <div className="row">
                    
                <div className="input-field">
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" className="reset-pass" value={pass2} onChange={(e)=>{
                            handlePass2(e.target.value)
                        }}/>
                    </div>
                </div>

                <div className="row">
              <div className="left-align">
              <label>
        <input type="checkbox" className="filled-in reset-chk" />
        <span>Show Password</span>
      </label> 
              </div>
            </div>

                <div className="row">
                    <button className="btn waves-effect waves-light" type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    )
}
