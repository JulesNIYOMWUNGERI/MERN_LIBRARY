import React, { useEffect } from 'react';
import {Grid,CircularProgress,Paper} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Book from './book/Book'
import { getBooks } from '../../actions';
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';


function useQuery() {
  return new URLSearchParams(useLocation().search)
}


const Books = ({ setCurrentId }) => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch();
  const location = useLocation();


  const { books,isLoading } = useSelector((state) => state.books);


  useEffect(() => {
   if(!searchQuery) dispatch(getBooks(page));
  },[location]);

 
if(!books?.length && !isLoading) return 'No Books'

  return (
    isLoading ? <CircularProgress /> :
    (
  <div className='flex flex-col'>
    <Grid style={{ backgroundColor:'white' }} container alignItems='stretch' spacing={1}>
     {books.map((book) => (
        <Grid key={book._id} item xs={12} md={3} lg={2} sm={4} raised elevation={6}>
          <Book book={book} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
      
    </Grid>
    {(!searchQuery) && (
    <div className='mt-1'>
     <Paper elevation={6}>
       <Pagination page={page} />
     </Paper>
    </div>
    )}
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1>
        <p className='py-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolores minus aspernatur velit natus consequuntur excepturi, dolore voluptas dolor est.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
            <h6 className='font_medium text-gray-400'>Solutions</h6>
            <ul>
                <li className='py-2 text-sm'>Analytics</li>
                <li className='py-2 text-sm'>Marketing</li>
                <li className='py-2 text-sm'>Commerce</li>
                <li className='py-2 text-sm'>Insights</li>
            </ul>
        </div>
        <div>
            <h6 className='font_medium text-gray-400'>Company</h6>
            <ul>
                <li className='py-2 text-sm'>About</li>
                <li className='py-2 text-sm'>Blog</li>
                <li className='py-2 text-sm'>Jobs</li>
                <li className='py-2 text-sm'>Press</li>
                <li className='py-2 text-sm'>Careers</li>
            </ul>
        </div>
        <div>
            <h6 className='font_medium text-gray-400'>Legal</h6>
            <ul>
                <li className='py-2 text-sm'>Claim</li>
                <li className='py-2 text-sm'>policy</li>
                <li className='py-2 text-sm'>Terms</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
    )
  )
}

export default Books