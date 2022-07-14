import axios from 'axios';

export const api = axios.create({
    baseURL: "https://conteudos.bloxs.com.br/wp-json/wp/v2/"
})