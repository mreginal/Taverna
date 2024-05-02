import axios from "axios";

export const api = axios.create({
    baseURL: 'https://taverna-api-teste.onrender.com'
})