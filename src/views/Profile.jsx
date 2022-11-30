import './Profile.css'
import Button from "../components/Button"
function Profile() {

    return(
    
    
        <div className='username-container'>
        <div className='title-container'>
        <div className='profile-title'> Profile </div>
        <div className='profile-username'>User Name</div>
        </div>
        <form className='profile-form'>
        <input className="username">
        </input>
        <Button className="username-button" text="Save"/>
        </form>
    </div>)
}

export default Profile