import './Home.css'
import Navbar from '../Navbar/Navbar'
import React from 'react'
import TodoForm from '../TodoForm/TodoForm'
import Search from '../Search/Search'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Search />
      <TodoForm />
      <div>Home</div>
    </div>
    
  )
}
