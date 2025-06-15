import axios from "axios";

const API = axios.create({
    baseURL : 'http://loacalhost:3000',
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'pplication/json'
    }
})

export default API