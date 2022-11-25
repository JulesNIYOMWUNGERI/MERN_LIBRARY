import {START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_ALL, GET, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

const books = (state = { isLoading: true, books:[] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state,
        books:action.payload.data,
        currentPage:action.payload.currentPage,
        numberOfPages:action.payload.numberOfPages,
      }
    case FETCH_BY_SEARCH:
      return { ...state, books:action.payload }
    case CREATE:
      return { ...state, books:[ ...state.books,action.payload ]}
    case UPDATE:
      return state;
    case DELETE:
      return state;
    case GET:
      return { ...state, book:action.payload }
    default:
      return state;
  }
};

export default books;




