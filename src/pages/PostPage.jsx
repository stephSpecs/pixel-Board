import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import thumbsUp from '../assets/thumbs-up.svg'
import { supabase } from '../supabaseClient.js'
import '../App.css'

const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase.from('posts').select().eq('id', id)
            setPost(data[0])
        }
        fetchPost()
    }, [id])

    const handleUpvote = async () => {
        await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id)
        setPost({ ...post, upvotes: post.upvotes + 1 })
    }

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await supabase.from('comments').select().eq("post_id", id)
            setComments(data)
        }
        fetchComments()
    }, [id])

    const handleComment = async (e) => {
        e.preventDefault()
        await supabase.from('comments').insert([{ content: commentContent, post_id: id, created_at: new Date().toISOString() }])
        setComments([...comments, { content: commentContent, post_id: id, created_at: new Date().toISOString() }])
        setCommentContent('')
    }
    
    const handleEdit = () => {
        navigate(`/edit/${id}`)
    }

    const handleDelete = async () => {
        await supabase.from('posts').delete().eq('id', id)
        navigate('/')
    }

    return (
        <div className="post-page-container">
            <h1>Posts</h1>
            
                {post && (
                    <div className="post-page-content">
                        <h2>{post.title}</h2>
                        <img className="post-page-image" src={post.image_url} alt={post.title} />
                        <h5>{post.content}</h5>

                        <div className="upvote-section">
                            <button className="upvote-button" onClick={handleUpvote}>
                                <img className="thumbsUp" src={thumbsUp} alt="upvote"/>
                            </button>
                            <p>{post.upvotes}</p>
                        </div>

                        <p>{new Date(post.created_at).toLocaleString('en-US', { 
                            timeZone: 'America/New_York',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })}</p>   

                        <div className="comments-section">
                            <h3>Comments</h3>
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment-card">
                                    <p>{comment.content}</p>
                                    <p key={comment.id}>{new Date(comment.created_at).toLocaleString('en-US', {
                                        timeZone: 'America/New_York',
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    })}</p>
                                </div>
                            ))}

                            <form className="comment-form" onSubmit={handleComment}>
                                <textarea value={commentContent} placeholder="Add a comment.." onChange={(e) => setCommentContent(e.target.value)}></textarea>
                                <button className="comment-button">Submit</button>
                            </form>
                                
                        </div>

                        <div className="edit-delete-buttons">
                            <button className="edit-button" onClick={handleEdit}>Edit Post</button>
                            <button className="delete-button" onClick={handleDelete}>Delete Post</button>
                        </div>

                    </div>
                )}

        </div>
    )
}

export default PostPage