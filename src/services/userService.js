import axios from 'axios';


const API_URL = 'http://localhost:8081/users';

export const loginService = async (User) => {
    const response = await axios.get(API_URL + "/login" , { params: User })
    return response
};
