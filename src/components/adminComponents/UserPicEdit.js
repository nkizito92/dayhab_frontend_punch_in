import { Link } from 'react-router-dom'
import { createImage } from '../../action/userAction'
import { connect } from 'react-redux'
import { useForm } from "react-hook-form"
import { useState } from 'react'
const UserPicEdit = ({ match, history, users, isLoggedIn, userImage, statusMessage }) => {
    const user = users.find(user => user.id === Number(parseInt(match.params.id)))
    const [message, setMessage] = useState()
    const image = userImage.filter(image => image.user_id === user.id)
    const [dat, setData] = useState(image)
    const { register, handleSubmit } = useForm()
    let displayUser = () => {
        if (user) {
            return (
                <>
                    <h1>{user.username}'s Account</h1>
                    <div>{displayPicForm()}</div>
                </>
            )
        }
    }

    const onSubmit = data => {
        setData(dat)
        if (data.image[0].size < 2058713) {
            let userImage = {
                id: Number(parseInt(match.params.id)),
                newImage: data
            }
            createImage(userImage)
        } else {
            let flash = {
                message: {
                    success: "",
                    error: "Image is larger then 2Mb!"
                }
            }
            setMessage(flash.message.error)
        }
    }

    const displayPicForm = () => {
        let errorColor = {
            color: "red"
        }
        return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" name="image" {...register('image')} accept="image/*" required />
                    <button>Submit</button>
                    <div style={errorColor} >{message}</div>
                </form>
            )
    }

    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <>
            {displayUser()}
            {redirect()}
            <Link className="button" to={`/users/${match.params.id}/edit`}>All Account Settings</Link>
        </>
    )
}
export default connect(null, { createImage })(UserPicEdit)