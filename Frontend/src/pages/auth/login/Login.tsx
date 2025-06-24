import { useNavigate } from "react-router-dom"
import Form from "../Form"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { LoginUserTypes } from "../types"
import { login, resetStatus } from "../../../store/authSlice"
import { Status } from "../../../globals/types/types"
import { useEffect } from "react"

const Login = () => {
  const navigate = useNavigate()
    const {status} = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()

  const handleLogin = async(data:LoginUserTypes) =>{
    //console.log(data)
    dispatch(login(data))
    

  }

  useEffect(()=>{
    if(status === Status.SUCCESS){
      dispatch(resetStatus())
      navigate('/')
    }
  },[status, dispatch, navigate])

  
  return (
   <Form type="login" onSubmit={handleLogin} />
  )
}

export default Login