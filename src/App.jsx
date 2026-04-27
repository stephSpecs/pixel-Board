import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import './App.css'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [orderBy, setOrderBy] = useState('created_at')
  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} orderBy={orderBy} setOrderBy={setOrderBy} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} orderBy={orderBy} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App