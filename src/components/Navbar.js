import React, { useState,useEffect } from 'react';
import {Button} from '@material-ui/core';
import {MdOutlineLibraryBooks } from 'react-icons/md';
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode'

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [nav,setNav] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  

  const logout = () => {
    history("/");

    dispatch({ type:LOGOUT });

    setUser(null);
}


  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwt_decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location]);


  const navHandler = () => {
    setNav(!nav)
  }
  return (
    <div className='flex flex-row'>
    <div className='flex lg:flex-row md:flex-row sm:flex-row justify-center bg-gray-800 w-full h-[60px] xl:space-x-[680px] lg:space-x-[500px] md:space-x-[250px] sm:space-x-[260px] space-x-[-20px] sticky'>
      <div className=' justify-center align-middle self-center'>
      <NavLink to='/'><h2 className='flex flex-row text-3xl font-bold text-[#00df9a]'>{<MdOutlineLibraryBooks size={40}/>}Library</h2></NavLink>
      </div>
      <div className='flex self-center space-x-[40px]'>
        <ul className='hidden md:flex flex-row justify-end align-middle'>
          {user && (<NavLink to='/books'><li className='p-2 text-[#00df9a] font-bold hover:cursor-pointer'>Books</li></NavLink>)}
          {user && (<NavLink to='/add'><li className='p-2 text-[#00df9a] font-bold hover:cursor-pointer'>Add Book</li></NavLink>)}
          <NavLink to='/contacts'><li className='p-2 text-[#00df9a] font-bold hover:cursor-pointer'>Contacts</li></NavLink>
          <NavLink to='/about'><li className='p-2 text-[#00df9a] font-bold hover:cursor-pointer'>About</li></NavLink>
        </ul>
        {user ? (
          <Button variant='contained' color='secondary' onClick={logout}>Log Out</Button>
        ):(
          <NavLink to='/auth'><Button variant='contained' color='inherit'>Sign In</Button></NavLink>
        )}
        <div onClick={navHandler} className='block md:hidden'>
          {nav ? <AiOutlineClose size={30}/>:<AiOutlineMenu size={30}/>}
        </div>
      </div>
    </div>
    <div className={nav ? 'flex flex-col fixed left-0 top-0 bg-white h-full w-[40%]' : 'hidden'}>
      <h2 className='flex flex-row text-3xl font-bold text-[#00df9a] ml-8 mt-4'>{<MdOutlineLibraryBooks size={40}/>}Library</h2>
      <ul className='md:flex flex-col justify-end align-middle'>
      <NavLink to='/books'><li className='p-2 mt-2 mx-6 text-[#00df9a] font-bold border-b border-b-gray-700 hover:cursor-pointer'>Books</li></NavLink>
      <NavLink to='/add'><li className='p-2 mt-2 mx-6 text-[#00df9a] font-bold border-b border-b-gray-700 hover:cursor-pointer'>Add Book</li></NavLink>
      <NavLink to='/contacts'><li className='p-2 mt-2 mx-6 text-[#00df9a] font-bold border-b border-b-gray-700 hover:cursor-pointer'>Contacts</li></NavLink>
      <NavLink to='/about'><li className='p-2 mt-2 mx-6 text-[#00df9a] font-bold border-b border-b-gray-700 hover:cursor-pointer'>About</li></NavLink>
      </ul>
    </div>
  </div>
  )
}

export default Navbar