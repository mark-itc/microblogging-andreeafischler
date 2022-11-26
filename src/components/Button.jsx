import "./Button.css"

function Button(props) {
     const { onClick, disabled } = props

    return (
        <div>
        <button className="tweet-button" onClick={onClick} disabled={disabled}>  
        Tweet 
         </button>
        </div>
            
        
    )
}

export default Button;