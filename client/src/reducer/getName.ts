import React from 'react'




const initState={
    initials:""

}

const getName=(state={initState},action:any)=>{
   if(action.type==='ADD_INIT'){
       console.log(action)
       return{
           ...state,
           initials:action.payload
       }
  
   }
   else{
    return state
}

}

export default getName