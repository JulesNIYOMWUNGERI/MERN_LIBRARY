import React from 'react';
import { Card,CardContent,CardActions,CardMedia,Button,Typography,ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from 'react-redux';
import { deleteBook } from '../../../actions';
import {NavLink, useNavigate} from 'react-router-dom';

const Book = ({ book,setCurrentId }) => {

  const history = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteBook(book._id,history))
  }

  const user = JSON.parse(localStorage.getItem('profile'))



  const openBook = () => history(`/books/books/${book._id}`)


  return (
    <Card className='flex flex-col mt-1 justify-between rounded-3xl h-[95%] relative' raised elevation={6}>
     <button className='active:bg-slate-200' onClick={openBook}> 
    <CardMedia className='h-0 pt-[56.25%] bg-red-300' image={book.image}/>
    <Typography className='flex justify-between pl-[16px] m-[20px]' variant='h5' component='h2'>{book.title}</Typography>
    <div className='absolute top-[5px] left-[5px] text-white' >
    <Typography className='flex justify-between ' variant='h5'>{book.author}</Typography>
    </div>
    <CardContent>
      <Typography variant='body2' color='textSecondary' component='p' >{book.description}</Typography>
    </CardContent>
    <div className='flex pl-1'>
      <Typography variant='body2' component='h2' color='textSecondary'>{book.price}</Typography>
    </div>
     </button>
      {(user?.result._id === book.creator) && (
    <CardActions className='flex flex-row justify-between pt-0 pr-[16px] pb-[4px] pl-[16px]'>
        <Button size='small' color='primary' onClick={deleteHandler}><DeleteIcon fontSize='small' />Delete</Button>
        <NavLink to='/add'><Button size='small' color='primary' onClick={()=>setCurrentId(book._id)}>Update</Button></NavLink>
    </CardActions>
      )}
   </Card> 
  )
}

export default Book