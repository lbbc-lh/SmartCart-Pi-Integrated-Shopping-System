import React, { useRef } from 'react'
import { useGlobalContext } from './context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import CartContainer from './CartContainer'
import Payment from './payment'
import Register from './Register'

// items

function App() {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Register />} />
          <Route path="/CartContainer" element={<CartContainer />} />
          <Route path="/Payment"  element={<Payment />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
