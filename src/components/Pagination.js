import React, { useEffect } from 'react';
import { Pagination,PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks } from '../actions';


const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.books);
   





  return (
    <Pagination
    count={numberOfPages}
    page={Number(page) || 1}
    variant='outlined'
    color='primary'
    renderItem={(item)=>(
        <PaginationItem { ...item } component={Link} to={`/books/books?page=${item.page}`} />
    )}
     />
  )
}

export default Paginate
