import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [education, setEducation] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name,place,age,phone,education,email, password);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                flexDirection: 'row',
                '& img': {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                }
            }}
        >
            {/* Image section */}
            <Box
                sx={{
                    flex: 1,
                    background: `url('https://images.unsplash.com/photo-1494809610410-160faaed4de0?q=80&w=2336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center`,
                    backgroundSize: 'cover',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* Optionally, add some overlay or additional content here */}
            </Box>
            {/* Signup form section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    height: '100vh',
                    padding: 3
                }}
            >
                <Container maxWidth="xs">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Signup
                    </Typography>
                    <form onSubmit={handleSubmit}>
                    <TextField
                            required
                            fullWidth
                            label="Name"
                            type="text"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Place"
                            type="text"
                            margin="normal"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Age"
                            type="number"
                            margin="normal"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Phone"
                            type="tel"
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Education"
                            type="text"
                            margin="normal"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={isLoading}
                        >
                            Signup
                        </Button>
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </form>
                </Container>
            </Box>
        </Box>
    );
};

export default Signup;


// import React,{useState} from 'react'
// import {useSignup} from '../hooks/useSignup'

// function Signup() {

//     const[email, setEmail] = useState('')
//     const[password, setPassword] = useState('')
//     const {signup, error, isLoading} = useSignup()

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         await signup(email, password)
//     }

//   return (
//     <form className='signup' onSubmit={handleSubmit}>
//         <h3>Signup</h3>
//         <input type='email' placeholder='Email' 
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//         />
//         <input type='password' placeholder='Password' 
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//         />
//         <button >Signup</button>
//         {error && <div className='error'>{error}</div>}
//     </form>
//   )
// }

// export default Signup
