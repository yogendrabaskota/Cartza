import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import Home from './components/Home'
import store from './store/store'

function App() {


  return (

    <Provider store = {store}>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element ={<Home />} /> 

      </Routes>
      </BrowserRouter>
    </Provider>
  

    
  )
}

export default App
