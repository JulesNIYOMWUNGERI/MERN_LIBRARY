import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const getBookBySearch = (searchQuery) => API.get(`/books/search?searchQuery=${searchQuery.search || 'none'}&author=${searchQuery.author || 'none'}`)
export const getBooks = (page) => API.get(`/books?page=${page}`);
export const createBook = (inputs) => API.post('/books',inputs);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const updateBook = (currentId,inputs) => API.patch(`/books/${currentId}`,inputs);
export const getBook = (id) => API.get(`/books/${id}`);

export const signIn = (formData) => API.post('/auth/signin',formData);
export const signUp = (formData) => API.post('/auth/signup',formData);