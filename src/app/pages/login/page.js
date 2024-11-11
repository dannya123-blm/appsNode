"use client";

import { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Container } from '@mui/material';
import Image from "next/image";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setMessage(data.message || 'Registration successful');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                setMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: '#262526',  // Space Grey background
            padding: 3,
            color: '#D1C4E9'  // Text color with a lighter purple tone for readability
        }}>
            <Image
                src="/images/logo.png"
                alt="DVS Note logo"
                width={260}
                height={200}
                priority
                style={{ marginBottom: '2rem' }}
            />
            <Box component="form" onSubmit={handleSubmit} sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'none',
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    sx={{ bgcolor: '#423B42', color: '#FFF', label: { color: '#D1C4E9' }, input: { color: '#FFF' } }}  // Input fields with space grey
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    sx={{ bgcolor: '#423B42', color: '#FFF', label: { color: '#D1C4E9' }, input: { color: '#FFF' } }}  // Email input styling
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    sx={{ bgcolor: '#423B42', color: '#FFF', label: { color: '#D1C4E9' }, input: { color: '#FFF' } }}  // Password input styling
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        marginTop: 2,
                        bgcolor: '#800F2F',  // Purplish-red button background
                        color: '#FFF',
                        ':hover': { bgcolor: '#57001C' },  // Darker shade on hover
                    }}
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>
                {message && (
                    <Typography variant="body2" sx={{
                        marginTop: 2,
                        color: message.includes('successful') ? '#43A047' : '#D32F2F', // Success in green, failure in red
                    }}>
                        {message}
                    </Typography>
                )}
                <Typography variant="body2" sx={{ marginTop: 2, color: '#D1C4E9' }}>
                    Already have an account? <Link href="../../pages/login" underline="hover" color="#B388FF">Login here</Link>  // Link with a lighter purple
                </Typography>
            </Box>
        </Container>
    );
}
