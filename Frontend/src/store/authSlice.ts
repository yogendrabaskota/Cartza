/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import API from '../http'
import { Status } from '../globals/types/types'

interface RegisterData{
    username : string,
    email : string,
    password : string
}
interface LoginData{
    email : string,
    password : string
}

interface User {
    username : string,
    email : string,
    password : string,
    token : string,
    
}
// enum STASTUS {
//     loading, //= 'Loading',
//     success, //= 'Success',
//     error, // = 'Error'
// }
interface AuthState {
    user : User,
    status : Status
}


const initialState: AuthState = {
    user : {} as User,
    status : Status.LOADING 
}


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser(state:AuthState, action:PayloadAction<User>){
            state.user = action.payload
        },
        setStatus(state:AuthState, action: PayloadAction<Status>){
            state.status = action.payload 
    }
}
})

export const {setUser,setStatus} = authSlice.actions
export default authSlice.reducer


export function register(data:RegisterData){
    return async function registerThunk(dispatch:any){
        dispatch(setStatus(Status.LOADING))
       try {
         const response = await API.post('/register',data)
        if(response.status === 201){
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))

            
        }
        
       } catch (error) {
        dispatch(setStatus(Status.ERROR))
        
       }
    }
}

export function login(data:LoginData){
    return async function loginThunk(dispatch:any){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.post('/login',data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))

            }else{
                dispatch(setStatus(Status.ERROR))

            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }

    }
}