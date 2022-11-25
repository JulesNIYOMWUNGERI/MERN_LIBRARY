import React from 'react';
import Typed from 'react-typed';
import { useState } from 'react';
import image from './books/images/Library-Management.jpg';
import { TextField } from '@material-ui/core';
import{
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBookBySearch } from '../actions';



const Home = () => {
  const [ search, setSearch ] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
 

  const searchBook = () => {
    if(search.trim()) {
      dispatch(getBookBySearch({ search, author:'none' }));
      history(`/books/books/search?searchQuery=${search || 'none'}`)
    } else {
      history('/books')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchBook();
    }
  }
  return (
    <React.Fragment>
    <div className='text-white'>
        <div className='max-w-[900px] mt-[0px] w-full h-[700px] mx-auto text-center flex flex-col justify-start'>
            <p className='tex-[#00df9a] font-bold p-2 mt-[50px]'>GROWING WITH ONLINE LIBRALY.</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 '>Reading Is The Root Of Knowledge</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Different Types Of Books</p>
                <Typed
                className='md:text-5xl sm:text-4xl text-xl font-bold md:p-4 pl-2 text-gray-400'
                strings={['STORY','SCIENCE','TECHNICAL']}
                typeSpeed={120}
                backSpeed={140}
                loop />
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-400'>Increase Your Knowledge With Online Libraly Which Is The Best Accessing All Kinds Of Books, STORY BOOKS, SCIENCE BOOKS, TECHNICAL BOOKS.</p>
            <button className='bg-[#00df9a] font-medium rounded-md w-[200px] my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>
      
    </div>


    <div>
      <div className='bg-white w-full h-[600px] flex space-between md:flex flex-col lg:flex'>
        <div className='flex flex-row w-[600px] h-[20px] mt-6 ml-4'>
         <TextField
         name='search'
         label='Search Book'
         variant='outlined'
         style={{borderwidth:'10px', width:'400px'}}
         value={search}
         onKeyPress={handleKeyPress}
         onChange={(e)=>setSearch(e.target.value)}
          />
         <button className='h-[55px] w-[100px] bg-[#0f6046] rounded-md p-1 ml-1' onClick={searchBook}>SEARCH</button>
        </div>
        <img className='h-[500px] w-full mt-[90px]' src={image} alt="/" />
        
      </div>

    </div>


    <div>
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
    </React.Fragment>
  )
}

export default Home