import "./Button.css"

function Button(props) {
     const { onClick, disabled, text } = props

    return (
        <div>
        <button className="tweet-button" onClick={onClick} disabled={disabled}>  
        {text}
         </button>
        </div>
            
        
    )
}

export default Button;