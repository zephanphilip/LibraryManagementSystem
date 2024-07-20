import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TextField, Button, Typography, Box } from '@mui/material';

function AdminReqForm() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [serialNo, setSerialNo] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { serialNo,title,author,publicationYear,genre,isbn };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (response.ok) {
      setSerialNo('');
      setTitle('');
      setAuthor('');
      setPublicationYear('');
      setGenre('');
      setIsbn('');
      setError(null);
      console.log('New workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } else {
      setError(json.error || 'Failed to add donor');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        ADD BOOK
      </Typography>
      <TextField
  required
  label="Serial Number"
  value={serialNo}
  onChange={(e) => setSerialNo(e.target.value)}
  variant="outlined"
  fullWidth
/>
<TextField
  required
  label="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  variant="outlined"
  fullWidth
/>
<TextField
  required
  label="Author"
  value={author}
  onChange={(e) => setAuthor(e.target.value)}
  variant="outlined"
  fullWidth
/>
<TextField
  required
  label="Publication Year"
  type="number"
  value={publicationYear}
  onChange={(e) => setPublicationYear(e.target.value)}
  variant="outlined"
  fullWidth
/>
<TextField
  required
  label="Genre"
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
  variant="outlined"
  fullWidth
/>
<TextField
  required
  label="ISBN"
  value={isbn}
  onChange={(e) => setIsbn(e.target.value)}
  variant="outlined"
  fullWidth
/>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        ADD BOOK
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default AdminReqForm;
