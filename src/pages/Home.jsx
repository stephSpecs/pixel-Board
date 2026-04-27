import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import thumbsUp from '../assets/thumbs-up.svg'
import { useEffect, useState } from 'react'
import '../App.css'

const Home = ({ searchQuery, orderBy }) => {
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase.from('posts').select().order(orderBy, { ascending: false })
            setPost(data)
        }
        fetchPost()
    }, [orderBy])
    console.log(post)

    return(
        <div className="home-container">
            <h1>Pixel Board</h1>

                <div className="home-posts-container">
                    {post.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <div className="post-card">
                                <h3>{post.title}</h3>
                                <img className="home-image"src={post.image_url} alt={post.title} />
                                <p><img className="thumbsUp" src={thumbsUp} alt="upvotes" /> {post.upvotes}</p>
                                <p>{new Date(post.created_at).toLocaleString('en-US', { 
                                    timeZone: 'America/New_York',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}</p>                                
                            </div>
                        </Link> 
                    ))}
                </div>

        </div>
    )
}

export default Home