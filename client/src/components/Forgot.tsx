import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

export const Forgot = () => {
    const[email,setEmail]=useState("")
    
    const history=useHistory()
 
   console.log(window.location.host)
 
  
    
     


    const handleChange=(e:any)=>{
        setEmail(e.target.value)
    }

    const onSubmitHandle=(e:any)=>{
        

       
        e.preventDefault()
       

        fetch('/forgotpassword',{
            
            method:'POST',
            
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                host:window.location.host,
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
                },3000)

            }
          
        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <div id="for-div">
              <div className="center-align">

            <form onSubmit={(e)=>{
                onSubmitHandle(e)
            }}>
            <div className="row">
                <div className="input-field">
                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder="abc@someone.com" value={email} autoFocus onChange={(e)=>{
                      handleChange(e)
                    }}/>
                </div>

                <div className="row">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </div>
            </div>
            </form>
        </div>
        </div>
      
    )
}
