
import Form from "../Form"
import type { RegisterUserTypes } from "../types"
import { register, resetStatus } from "../../../store/authSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Status } from "../../../globals/types/types"


const Register = () => {
  const navigate = useNavigate()
    const {status} = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()

  const handleRegister = async(data:RegisterUserTypes) =>{
  //  console.log(data)
    dispatch(register(data))
    

  }

  useEffect(()=>{
    if(status === Status.SUCCESS){
      dispatch(resetStatus())
      navigate('/login')
    }
  },[status, dispatch, navigate])


  return (
   
    <Form type = "register" onSubmit = {handleRegister} />
  )
}

export default Register