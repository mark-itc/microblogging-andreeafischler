import './Comment-Box.css'


function CommentBox(props) {
    const {text, date, username} = props

    return (
        <div className='comment-box'>
         <span className='profile-name'>{username}</span>
         <span className='date'>{date}</span>
         <div className='text-container'>
         <div className='text'>{text}</div>
         </div>
        </div>
            
        
    )
}

export default CommentBox