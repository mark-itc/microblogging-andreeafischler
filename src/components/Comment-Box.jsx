import './Comment-Box.css'
import { useState, useEffect } from 'react'

function CommentBox(props) {
    const {text} = props
    const [date, setDate] = useState("")

    useEffect(() => {
        setDate(new Date())
      }, [])


    return (
        <div className='comment-box'>
         <span className='profile-name'>Yonatan</span>
         <span className='date'>{date.toLocaleString()}</span>
         <div className='text-container'>
         <div className='text'>{text}</div>
         </div>
         
        </div>
            
        
    )
}

export default CommentBox