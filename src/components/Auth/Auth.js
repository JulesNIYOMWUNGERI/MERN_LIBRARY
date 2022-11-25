import React, { useState } from 'react';
import { Avatar,Button,Grid,Paper,Container } from '@material-ui/core';
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Inputs';
import { signIn, signUp } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';




const initialState = {firstName:'',lastName:'',email:'',password:'',comfirmPassword:''}

const Auth = () => {
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();



    const handleShowPassword = () =>{ 
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]:e.target.value })
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            dispatch(signUp(formData,history));
        } else {
            dispatch(signIn(formData,history));
        }
    }


    const googleSuccess = async(response) => {
        const decoded = jwt_decode(response.credential)
        

        const result = {
            _id:decoded?.sub,
            _type:'user',
            userName:decoded?.name,
            email:decoded?.email,
            image:decoded?.picture,
        }

        const token = response?.credential;

        try {
            dispatch({ type:AUTH, data:{ result,token } });

            history('/books')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('Error');
        console.log('Google Sign In Was UnSuccessfully!. Try Again Later')
    }

  return (
    <Container component="main" maxWidth="xs" className='mt-[30px]'>
        <Paper className='flex flex-col items-center space-y-2' elevation={3}>
            <Avatar className='my-3'>
                <LockOutlinedIcon />
            </Avatar>
            <h5 className='text-[#00df9a] font-bold text-3xl'>{isSignUp ? 'Sign up' : 'Sign in'}</h5>
            <form className='w-[80%%] my-1 mx-2' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name='comfirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                </Grid>
                <div className='my-2'>
                <Button type='submit' fullWidth variant='contained' color='secondary'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <div className='my-1'>
                <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleFailure}
                 />
                </div>
                 </div>
                <Grid container justifyContent='flex-end'>
                   <Grid item  className='bg-gray-400'>
                       <Button onClick ={switchMode}>
                           {isSignUp ? 'Allready Have An Account? Sign In' : 'Dont Have An Account? Sign Up'}
                       </Button>
                   </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth