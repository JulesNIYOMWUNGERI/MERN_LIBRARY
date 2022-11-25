import * as api from "../api/index.js";
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, GET, CREATE, UPDATE, DELETE } from '../constants/actionTypes';


export const getBook = (id) => async(dispatch) => {
    try {
        dispatch({ type:START_LOADING })
        const { data } = await api.getBook(id);

        dispatch({ type:GET, payload: data });
        dispatch({ type:END_LOADING })
    } catch (error) {
        console.log(error)
    }
};

export const getBooks = (page) => async(dispatch) => {
    try {
        dispatch({ type:START_LOADING })
        const { data } = await api.getBooks(page);
        console.log(data)

        dispatch ({ type:FETCH_ALL, payload: data });
        dispatch({ type:END_LOADING })
    } catch (error) {
        console.log(error)
    }
};

export const getBookBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type:START_LOADING })
        const { data: { data } } = await api.getBookBySearch(searchQuery);
        console.log(data);

        dispatch ({ type:FETCH_BY_SEARCH, payload: data });
        dispatch({ type:END_LOADING })
    } catch (error) {
        console.log(error)
    }
};

export const createBook = (book,history) => async(dispatch) => {
    try {
        dispatch({ type:START_LOADING })
        const { data } = await api.createBook(book);

        dispatch ({ type:CREATE, payload: data });

        history('/books');
    } catch (error) {
        console.log(error)
    }
};

export const deleteBook = (id,history) => async(dispatch) => {
    try {
        await api.deleteBook(id);

        dispatch({ type:DELETE, payload: id })

        history('/books')
    } catch (error) {
        console.log(error)
    }
}

export const updateBook = (history,currentId,inputs) => async(dispatch) => {
    try {
        console.log(currentId);
        const { data } = await api.updateBook(currentId,inputs);

        dispatch({ type:UPDATE, payload: data });

        history('/books')
    } catch (error) {
        console.log(error)
    }
}



