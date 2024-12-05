import axios from 'axios';

const API_URL = 'http://localhost:5157/profile/'; 

export const getProfile = async(login) => {
    try{
        const response = await axios.get(`${API_URL}${login}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}