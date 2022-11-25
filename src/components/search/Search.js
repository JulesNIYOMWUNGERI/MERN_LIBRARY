import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../actions';

const Search = ({ search,setCurrentId }) => {

    const history = useNavigate();
    const dispatch = useDispatch();
  
    const deleteHandler = () => {
      dispatch(deleteBook(search._id,history))
    }
  


  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <Card className='flex flex-col justify-between border-[2px] h-[100%] relative'>
    <CardMedia className='h-0 pt-[86.25%] bg-red-300' image={search.image}/>
    <Typography className='flex justify-between pl-[16px] m-[20px]' variant='h5' component='h2'>{search.title}</Typography>
    <CardContent>
      <Typography variant='body2' color='textSecondary' component='p' >{search.description}</Typography>
    </CardContent>
    <div className='flex pl-1'>
      <Typography variant='body2' component='h2' color='textSecondary'>{search.price}</Typography>
    </div>
      {(user?.result._id === search.creator) && (
    <CardActions className='flex flex-row justify-between pt-0 pr-[16px] pb-[8px] pl-[16px]'>
        <Button size='small' color='primary' onClick={deleteHandler}><DeleteIcon fontSize='small' />Delete</Button>
        <NavLink to='/add'><Button size='small' color='primary' onClick={() => setCurrentId(search._id)}>Update</Button></NavLink>
    </CardActions>
      )}
   </Card> 
  )
}

export default Search
