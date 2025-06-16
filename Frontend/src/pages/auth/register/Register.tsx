import { useDispatch } from "react-redux"
import Form from "../Form"
import type { UserDataTypes } from "../types"


const Register = () => {
  const dispatch = useDispatch()
  const handleRegister = (data:UserDataTypes) =>{
    console.log(data)

  }


  return (
   
    <Form type = "register" onSubmit = {handleRegister} />
  )
}

export default Register