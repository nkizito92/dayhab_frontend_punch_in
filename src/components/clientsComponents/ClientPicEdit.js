import { Link } from 'react-router-dom'
import { createClientImage } from '../../action/clientAction'
import { connect } from 'react-redux'
import { useForm } from "react-hook-form"
import { useState } from 'react'
const ClientPicEdit = ({ match, history, current_user, isLoggedIn, clientImage, statusMessage, clients }) => {
    let user = current_user
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
            user = 0
        }
    }
    const client = clients.find(client => client.id === Number(parseInt(match.params.id)))
    const [message, setMessage] = useState()
    const image = clientImage.filter(image => image.user_id === user.id)
    const [dat, setData] = useState(image)
    const { register, handleSubmit } = useForm()
    let displayClient = () => {
        if (user) {
            return (
                <>
                    <h1>{client.full_name}'s profile picture</h1>
                    <div>{displayPicForm()}</div>
                </>
            )
        }
    }

    const onSubmit = data => {
        setData(dat)
        if (data.image[0].size < 2058713) {
            let clientImage = {
                id: Number(parseInt(match.params.id)),
                newImage: data
            }
            createClientImage(clientImage)
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

    
    return (
        <>
            {displayClient()}
            {redirect()}
            <Link className="button" to={`/clients/${match.params.id}/edit`}>All Client Settings</Link>
        </>
    )
}
export default connect(null, { createClientImage })(ClientPicEdit)