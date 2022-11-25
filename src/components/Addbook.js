import React, { useState,useEffect } from 'react';
import {Paper,TextField,Button} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux'; 
import { createBook, updateBook } from '../actions/index';
import { useNavigate } from 'react-router-dom'
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';



const Addbook = ({ currentId,setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs,setInputs] = useState({ title:'',author:'',description:'',price:'',content:'',image:'' });
  
  const book = useSelector((state) => currentId ? state.books.books.find((p) => p._id === currentId ) : null )

  
  const clear = () => {
    setCurrentId(0)
    setInputs({title:'',author:'',description:'',price:'',content:'',image:''})
  }

  useEffect(()=>{
    if(book) setInputs(book);
  },[book])


const handleSubmit = (e) => {
  e.preventDefault();

  if(currentId === 0) {
    dispatch(createBook(inputs,history));
  }else {
    dispatch(updateBook(history,currentId,inputs));
  }

  clear();

 history('/books');
}



  return (
    <div className='flex flex-col'>
    <Paper className='flex items-center p-2 lg:w-[500px] md:w-[450px] sm:w-[350px] w-[350px] my-3 lg:mx-[380px] md:mx-[180px] sm:mx-[150px]'>
      <form autoComplete='off' noValidate className='flex flex-wrap justify-center m-1 space-y-2' onSubmit={handleSubmit}>
        <h1 className='text-[#00df9a] text-3xl font-bold mb-2'>{currentId ? `Edditing "${book.title}"`: 'Create a Book'}</h1>
        <TextField name='title' variant='outlined' label='Title' fullWidth required value={inputs.title} onChange={(e)=>setInputs({ ...inputs, title: e.target.value })}  />
        <TextField name='author' variant='outlined' label='Author' fullWidth required value={inputs.author} onChange={(e)=>setInputs({ ...inputs, author: e.target.value})}  />
        <TextField name='description' variant='outlined' label='Description' required multiline minRows={4} fullWidth value={inputs.description} onChange={(e)=>setInputs({ ...inputs, description: e.target.value })}  />
        <TextField name='content' variant='outlined' label='Content' required multiline minRows={5} fullWidth value={inputs.content} onChange={(e)=>setInputs({ ...inputs, content: e.target.value })}  />
        <TextField name='price' variant='outlined' label='Price' fullWidth required value={inputs.price} onChange={(e)=>setInputs({ ...inputs, price: e.target.value })}  />
        <div className='w-[97%] mt-[10px] mr-0 mb-1'><FileBase type='file' multiple={false} onDone={({base64}) => setInputs({ ...inputs, image: base64 })}/></div>
        <Button className='mb-4' variant='contained' color='primary' size='large' type='submit' fullWidth>submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 bg-[#f7f8ff] text-gray-800'>
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

export default Addbook;