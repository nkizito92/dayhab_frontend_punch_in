import { updateUser, editImage, deleteImage } from "../../action/userAction"
import { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from "react-hook-form"

const AccountEdit = ({ statusMessage, users, match, history, isLoggedIn, userImage }) => {
    let user = users.find(user => user.id === Number(parseInt(match.params.id)))
    const image = userImage.filter(image => image.user_id === user.id)
    const redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
            user = 0
        }
    }
    const { register, handleSubmit } = useForm()
    if (user === undefined) redirect()
    const [userName, setUserName] = useState(user.username)
    const [currentPassword, setCurPass] = useState()
    const [password, setPass] = useState()
    const [passwordConfirmation, setPassCon] = useState()

    let handleSubmitUser = e => {
        e.preventDefault()
        let editedUser = {
            id: Number(parseInt(match.params.id)),
            username: userName,
            currentPassword: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation
        }
        updateUser(statusMessage, editedUser)
    }

    const onSubmit = data => {
        let formData = new FormData();
        formData.append('image_element', data.image[0])
        formData.append('user_id', Number(parseInt(match.params.id)))
        formData.append('client_id', "")
        let userImage = {
            id: image[0].id,
            newImage: formData
        }
        editImage(userImage, statusMessage)
    }
    const handleDelete = () => {
        let userImage = {
            id: image[0].id,
        }
        deleteImage(userImage, statusMessage)
    }
    let displayForm = () => {
        if (user) {
            return (
                <>
                    <h1>
                        {user.username} Account Settings
                    </h1>
                    <form onSubmit={e => handleSubmitUser(e)}>
                        <input type="text" name="username" value={userName} onChange={e => setUserName(e.target.value)} hidden />
                        <input type="password" name="password" placeholder="Current password" onChange={e => setCurPass(e.target.value)} />
                        <input type="password" name="password" placeholder="New password" onChange={e => setPass(e.target.value)} />
                        <input type="password" name="password_confirmation" placeholder="Password Confirmation" onChange={e => setPassCon(e.target.value)} />
                        <button type="submit" onClick={(e) => handleSubmitUser(e)}>Update Account</button>
                    </form>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="file" name="image" {...register('image')} accept="image/*" required />
                        <button>Submit</button>
                    </form>
                    <form onSubmit={() => handleDelete()}>
                        <input onClick={handleDelete} type="button" value="Delete Photo" />
                    </form>
                </>
            )
        }
    }


    return (
        <>
            {redirect()}
            {displayForm()}
        </>
    )
}

export default connect(null, { updateUser, editImage, deleteImage })(AccountEdit)