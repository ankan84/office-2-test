import React from 'react'
import MainPage from './MainPage'
import { Route,Routes } from 'react-router-dom'
import Cart from './Cart'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<MainPage></MainPage>}></Route>
      <Route exact path='/cart' element={<Cart></Cart>}></Route>
    </Routes>
    
  )
}

export default App