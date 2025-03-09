import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        dispatch(login(userData))
            .then((response) => {
                if (response.error) {
                    setErrorMessage('Invalid email or password');
                } else {
                    setErrorMessage('');
                    navigate('/dashboard'); // or wherever you want to redirect on success
                }
            })
            .catch(() => {
                setErrorMessage('Invalid email or password');
            });
    };

    return (
        <div className=' flex flex-col'>
            <div>
                <img src="https://i.ibb.co/gSDqBsy/mainlogo.jpg" alt="" />
            </div>
            <div className=' items-center text-center mb-4'>
                {errorMessage && (
                    <Grid item xs={12}>
                        <Typography color="error" alignItems="center">
                            {errorMessage}
                        </Typography>
                    </Grid>
                )}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                required
                                id='email'
                                name='email'
                                label="Email"
                                fullWidth
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                required
                                id='password'
                                name='password'
                                label="Password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                autoComplete='current-password'
                                InputProps={{
                                    endAdornment: (
                                        <Button 
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    ),
                                }}
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
                                    Log In
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <div className=' py-3 flex justify-center items-center'>
                <p>If you don't have an account?</p>
                <Button onClick={() => navigate("/register")} className=' ml-5' size='small'>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default LoginForm;
