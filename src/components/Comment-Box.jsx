import './Comment-Box.css'
import { useState, useEffect } from 'react'
import { clear } from 'localforage'

function CommentBox(props) {
    const {text, createdAt} = props

    return (
        <div className='comment-box'>
         <span className='profile-name'>Yonatan</span>
         <span className='date'>{createdAt}</span>
         <div className='text-container'>
         <div className='text'>{text}</div>
         </div>
        </div>
            
        
    )
}

export default CommentBox