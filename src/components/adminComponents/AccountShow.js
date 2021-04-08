import { Link } from 'react-router-dom'
import { createImage } from '../../action/userAction'
import { connect } from 'react-redux'
import { useForm } from "react-hook-form"
import { useState } from 'react'

const AccountShow = ({ match, history, users, isLoggedIn, userImage, statusMessage }) => {
    const user = users.find(user => user.id === Number(parseInt(match.params.id)))
    const [message, setMessage] = useState()
    const image = userImage.filter(image => image.user_id === user.id)
    const { register, handleSubmit } = useForm()
    let displayUser = () => {
        if (user) {
            return (
                <>
                    <h1>{user.username}'s Account</h1>
                    <div>{displayPicForm()}</div>
                    <h2>Drivers {user.drivers.length}</h2>
                </>
            )
        }
    }

    const onSubmit = data => {
        if (data.image[0].size < 1058713) {
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
        if (!image[0]) {
            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" name="image" {...register('image')} accept="image/*" required />
                    <button>Submit</button>
                    <div style={errorColor} >{message}</div>
                </form>
            )
        } else {
            return <img className="userPhoto" alt="Admins Pic" src={image[0].image_element.url} />
        }
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
            <Link className="button" to={`/users/${match.params.id}/edit`}>Account Settings</Link>
        </>
    )
}
export default connect(null, { createImage })(AccountShow)