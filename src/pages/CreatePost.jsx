import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'

const CreatePost = () => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitted!")
        await supabase.from('posts').insert([{image_url: image, title, content }])
        navigate('/')
    }

    return (
        <div className="create-post-container">

            <div className="create-post-form">
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <input value={image} placeholder="Upload Image" onChange={(e) => setImage(e.target.value)} />
                    <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={content} placeholder="Write a caption..." onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className="create-post-button">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default CreatePost