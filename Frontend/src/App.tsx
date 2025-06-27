import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'

import store from './store/store'
import Home from './pages/home/Home'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import SingleProduct from './pages/product/SingleProduct'
import Cart from './pages/cart/Cart'

function App() {


  return (

    <Provider store = {store}>
      <BrowserRouter>

      <Routes>
        <Route path='/' element ={<Home />} /> 
        <Route path='/register' element ={<Register />}  />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />




      </Routes>
      </BrowserRouter>
    </Provider>
  

  )
}

export default App
