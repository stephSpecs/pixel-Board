import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import '../App.css'

const EditPost = () => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase.from('posts').select().eq('id', id)
            setImage(data[0].image_url)
            setTitle(data[0].title)
            setContent(data[0].content)
        }
        fetchPost()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        await supabase.from('posts').update({ image_url: image, title, content }).eq('id', id)
        navigate(`/post/${id}`)
    }

    return (
        <div className="create-post-container">
            <div className="create-post-form">
                <h1>Edit Post</h1>
                <form onSubmit={handleUpdate}>
                    <input value={image} placeholder="Upload Image" onChange={(e) => setImage(e.target.value)} />
                    <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={content} placeholder="write a caption..." onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className="create-post-button">Update Post</button>
                </form>                
            </div>

        </div>
    )
}

export default EditPost