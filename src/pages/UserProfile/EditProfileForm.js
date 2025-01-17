import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
import './UsersProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.user?.name)
    const [about, setAbout] = useState(currentUser?.user?.about)
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(tags.length === 0){
            dispatch(updateProfile( currentUser?.user?.email, { name, about, tags: currentUser?.user?.tags }))
        } else{
            dispatch(updateProfile( currentUser?.user?.email, { name, about, tags }))
        }
        setSwitch(false)
    }

    return (
        <div>
            <h1 className='edit-profile-title'>
                Edit Your Profile <FontAwesomeIcon icon={faPen} /> 
            </h1>
            <h2 className="edit-profile-title-2">
                Public Information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched tags</h3>
                    <p>Add tags separated by 1 space</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
                </label><br />
                <input type="submit" value='Save profile' className='user-submit-btn'/>
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfileForm