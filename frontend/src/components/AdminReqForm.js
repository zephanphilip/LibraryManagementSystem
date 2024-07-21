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
  const [desc, setDesc] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const formData = new FormData();
    formData.append('serialNo', serialNo);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publicationYear', publicationYear);
    formData.append('genre', genre);
    formData.append('desc', desc);
    formData.append('isbn', isbn);
    formData.append('image', image); // Append image to form data

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: formData,
      headers: {
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
      setDesc('');
      setIsbn('');
      setImage(null); // Reset image state
      setError(null);
      console.log('New book added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } else {
      setError(json.error || 'Failed to add book');
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
        label="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])} // Update image state on file change
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


// import React, { useState } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { TextField, Button, Typography, Box } from '@mui/material';

// function AdminReqForm() {
//   const { user } = useAuthContext();
//   const { dispatch } = useWorkoutsContext();

//   const [serialNo, setSerialNo] = useState('');
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publicationYear, setPublicationYear] = useState('');
//   const [genre, setGenre] = useState('');
//   const [desc, setDesc] = useState('');
//   const [isbn, setIsbn] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       setError('You must be logged in');
//       return;
//     }

//     const workout = { serialNo,title,author,publicationYear,genre,desc,isbn };

//     const response = await fetch('http://localhost:4000/api/workouts', {
//       method: 'POST',
//       body: JSON.stringify(workout),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${user.token}`
//       }
//     });

//     const json = await response.json();
//     if (response.ok) {
//       setSerialNo('');
//       setTitle('');
//       setAuthor('');
//       setPublicationYear('');
//       setGenre('');
//       setDesc('');
//       setIsbn('');
//       setError(null);
//       console.log('New workout added', json);
//       dispatch({ type: 'CREATE_WORKOUT', payload: json });
//     } else {
//       setError(json.error || 'Failed to add donor');
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//         maxWidth: 400,
//         mx: 'auto',
//         p: 2,
//         borderRadius: 2,
//         boxShadow: 3
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         ADD BOOK
//       </Typography>
//       <TextField
//   required
//   label="Serial Number"
//   value={serialNo}
//   onChange={(e) => setSerialNo(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="Title"
//   value={title}
//   onChange={(e) => setTitle(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="Author"
//   value={author}
//   onChange={(e) => setAuthor(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="Publication Year"
//   type="number"
//   value={publicationYear}
//   onChange={(e) => setPublicationYear(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="Genre"
//   value={genre}
//   onChange={(e) => setGenre(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="Description"
//   value={desc}
//   onChange={(e) => setDesc(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
// <TextField
//   required
//   label="ISBN"
//   value={isbn}
//   onChange={(e) => setIsbn(e.target.value)}
//   variant="outlined"
//   fullWidth
// />
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//       >
//         ADD BOOK
//       </Button>
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}
//     </Box>
//   );
// }

// export default AdminReqForm;
