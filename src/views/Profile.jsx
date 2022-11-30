import './Profile.css'
import Button from "../components/Button"
import { useState } from 'react'



function Profile() {

    const [userName, setUserName] = useState("")
    
    function saveUserName() {
        localStorage.setItem("userName", JSON.stringify(userName))
    }

    function handleUserName(e) {
     setUserName(e.target.value)
    }

    return(

        <div className='username-container'>
        <div className='title-container'>
        <div className='profile-title'> Profile </div>
        <div className='profile-username'>User Name</div>
        </div>
        <form className='profile-form'>
        <input className="username" type="text" onChange={handleUserName}>
        </input>
        <Button className="username-button" onClick={saveUserName} text="Save"/>
        </form>
    </div>)
}

export default Profile