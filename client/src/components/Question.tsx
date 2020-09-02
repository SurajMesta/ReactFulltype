import React,{FC}from 'react'

export type Props={
    questions:string[]
}


const Question:FC<Props> = ({questions}) => {
    return (
        <div>
            <h2>Questions</h2>
        </div>
    )
}

export default Question
