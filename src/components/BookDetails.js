import React, { useEffect } from 'react';
import { Paper,Typography,CircularProgress,Divider } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { getBook, getBookBySearch } from '../actions';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const BookDetails = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { book,books,isLoading } = useSelector((state) => state.books);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook(id))
  },[id]);


  useEffect(() => {
    if(book){
      dispatch(getBookBySearch({ search:'none', author:book?.author}));
    }
  },[book]);




  if(!book) return null

  if(isLoading) {
    return <div className='flex justify-center items-center p-[20px] rounded-xl h-[39vh]'>
      <CircularProgress size="7em"/>
    </div>
  }

  const recommendedBooks = books.filter(({ _id }) => _id !== book._id );
  const openBook = (_id) => history(`/books/books/${_id}`)


  return (
    <div className='flex flex-col'>
    <div className='flex flex-col bg-[#f7f8ff]'>
      <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col bg-[#f7f8ff] my-1 mx-1 '>
        <div className='mx-4'>
          <Typography variant='h3' component='h2'>{book.title}</Typography>
          <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{book.price}</Typography>
          <Typography gutterBottom variant='body1' component='p'>{book.description}</Typography>
          <Typography variant='h6'>Created By: {book.author}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'><strong>Realtime Chat - Comming Soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'><strong>Comment - Comming Soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className='flex w-[400px] rounded'>
          <img className='rounded w-[100%] max-h-[300px]' src={book.image} alt={book.title}/>
        </div>
      </div>
      <div>
      <Typography variant='h3' component='h2'>Book Content</Typography>
      <Divider style={{ margin: '20px 0' }} />
      <Typography gutterBottom variant='body1' component='p'>{book.content}</Typography>
      </div>
      {recommendedBooks.length && (
        <div className='rounded-2xl m-[10px] flex-1'>
          <Typography gutterButtom variant='h5' >You Might Also Like:</Typography>
          <Divider />
          <div className='flex flex-row'>
            {recommendedBooks.map(({ title,author,price,image,_id }) => (
              <div className='m-[20px] cursor-pointer' onClick={() => openBook(_id)} key={ _id }>
                <Typography gutterButtom variant='h6'>{title}</Typography>
                <Typography gutterButtom variant='subtitle2'>{author}</Typography>
                <Typography gutterButtom variant='subtitle2'>{price}</Typography>
                <img src={image} width='200px' />
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
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
}

export default BookDetails
