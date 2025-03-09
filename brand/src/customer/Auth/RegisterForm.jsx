import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUser, register } from '../../State/Auth/Action';
import { store } from '../../State/Store';

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store=>store)

    useEffect(()=>{
        if(jwt){
            dispatch(getUser(jwt))
        }
    },[jwt,auth.jwt])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        dispatch(register(userData));
    }
  return (
    <div className=' flex flex-col '>
        <div>
            <img src="https://i.ibb.co/gSDqBsy/mainlogo.jpg" alt="" />
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        required
                        id='firstName'
                        name='firstName'
                        label="First Name"
                        fullWidth
                        autoComplete='given-name'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        required
                        id='lastName'
                        name='lastName'
                        label="Last Name"
                        fullWidth
                        autoComplete='given-name'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        required
                        id='email'
                        name='email'
                        label="Email"
                        fullWidth
                        autoComplete='given-name'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        required
                        id='password'
                        name='password'
                        label="Pass Word"
                        fullWidth
                        autoComplete='password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex items-center justify-center">
                            <Button
                                className="bg-[#1e90ff]"
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ padding: ".8rem .5rem" , '&:hover': {backgroundColor:'#3498db'}}}
                            >
                                Register
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
        <div className=' py-3 flex justify-center items-center'>
            <p >If you already have account ?</p>
            <Button onClick={()=>navigate("/login")} className=' ml-5' size='small'>Login</Button>
        </div>
    </div>
  )
}

export default RegisterForm
