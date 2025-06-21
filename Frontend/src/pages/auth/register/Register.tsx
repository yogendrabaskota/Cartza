
import Form from "../Form"
import type { UserDataTypes } from "../types"
import { register } from "../../../store/authSlice"
import { useAppDispatch } from "../../../store/hooks"


const Register = () => {
  const dispatch = useAppDispatch()
  const handleRegister = (data:UserDataTypes) =>{
    console.log(data)
    dispatch(register(data))

  }


  return (
   
    <Form type = "register" onSubmit = {handleRegister} />
  )
}

export default Register