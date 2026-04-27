import gameConsole from './assets/game-console.svg'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './App.css'

const Navbar = ({ searchQuery, setSearchQuery, orderBy, setOrderBy }) => {
    const location = useLocation()
    const navigate = useNavigate()

    return(
        <nav className="navbar">
                <img src={gameConsole} alt="logo" className="gameConsole" />
                {location.pathname !== '/' &&
                    <button className="home-button" onClick={() => navigate('/')}>Home</button>
                }    

                {location.pathname === '/' && 
                <input value={searchQuery} placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} />
                }

                {location.pathname === '/' && 
                    <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="created_at">Newest</option>
                        <option value="upvotes">Most Votes</option>
                    </select>
                }                

                <button className="create-post-button" onClick={() => navigate('/create')}>Create Post</button>

        </nav>
    )
}

export default Navbar