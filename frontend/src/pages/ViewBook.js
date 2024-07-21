import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Container, Paper } from '@mui/material';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d4c41', // Brown
    },
    secondary: {
      main: '#ffeb3b', // Yellow
    },
    background: {
      default: '#f5f5f5', // Light grey
      paper: '#ffffff', // White
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: '#6d4c41', // Brown
    },
    body1: {
      fontSize: '1rem',
      color: '#424242', // Dark grey
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575', // Medium grey
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          margin: '10px 0',
          borderRadius: '10px',
          backgroundColor: '#ffffff', // White
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
});

const ViewBook = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch book data');
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id, user.token]);

  const handleRentOut = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/uapprove/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ isAvailable: false })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        alert('You had successfully rented out this book');
        navigate('/');
      } else {
        console.error('Failed to approve:', json.error);
      }
    } catch (error) {
      console.error('Error approving workout:', error);
    }
  };

  const handleFinishReading = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/approve/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ isAvailable: true })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        alert('You had successfully finished reading');
        navigate('/');
      } else {
        console.error('Failed to approve:', json.error);
      }
    } catch (error) {
      console.error('Error approving workout:', error);
    }
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!book) return <Typography>Loading...</Typography>;

  const canFinishReading = book.currentUser === user.userId;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper>
        {book.image && (
          <img
            src={`http://localhost:4000/${book.image}`}
            
            alt={book.title}
            style={{
              width: '100%',
              maxWidth: '400px', // Set maximum width
              height: 'auto', // Maintain aspect ratio
              marginBottom: '16px',
            }}
          />
        )}
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Box>
            <Typography variant="body1">
              <strong>Serial No:</strong> {book.serialNo}
            </Typography>
            <Typography variant="body1">
              <strong>Author:</strong> {book.author}
            </Typography>
            <Typography variant="body1">
              <strong>Publication Year:</strong> {book.publicationYear}
            </Typography>
            <Typography variant="body1">
              <strong>Genre:</strong> {book.genre}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {book.desc}
            </Typography>
            <Typography variant="body1">
              <strong>ISBN:</strong> {book.isbn}
            </Typography>
            <Typography variant="body1">
              <strong>Available:</strong> {book.isAvailable ? 'Yes' : 'No'}
            </Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRentOut}
              disabled={!book.isAvailable}
            >
              {book.isAvailable ? 'RENT OUT' : 'STOCK OUT'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFinishReading}
              disabled={!canFinishReading}
            >
              FINISH READING
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ViewBook;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Typography, Box, Button, Container, Paper } from '@mui/material';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';

// const ViewBook = () => {
//   const { user } = useAuthContext();
//   const { dispatch } = useWorkoutsContext();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         if (!response.ok) throw new Error('Failed to fetch book data');
//         const data = await response.json();
//         setBook(data);
        
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchBook();
//   }, [id, user.token]);

//   const handleRentOut = async () => {
//     if (!user) return;
//     console.log(book);
//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/uapprove/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ isAvailable: false })
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//         alert('You had successfully rented out this book');
//         navigate('/');
//       } else {
//         console.error('Failed to approve:', json.error);
//       }
//     } catch (error) {
//       console.error('Error approving workout:', error);
//     }
//   };

//   const handleFinishReading = async () => {
//     if (!user) return;

//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/approve/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ isAvailable: true })
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//         alert('You had successfully finished reading');
//         navigate('/');
        
//       } else {
//         console.error('Failed to approve:', json.error);
//       }
//     } catch (error) {
//       console.error('Error approving workout:', error);
//     }
//   };

//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!book) return <Typography>Loading...</Typography>;

//   // Check if the Finish Reading button should be enabled
//   const canFinishReading = book.currentUser === user.userId;
//   console.log(book.currentUser,user.userId)

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         {book.title}
//       </Typography>
//       <Box>
//         <Typography variant="body1">
//           <strong>Serial No:</strong> {book.serialNo}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Author:</strong> {book.author}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Publication Year:</strong> {book.publicationYear}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Genre:</strong> {book.genre}
//         </Typography>
//         <Typography variant="body1">
//           <strong>ISBN:</strong> {book.isbn}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Available:</strong> {book.isAvailable ? 'Yes' : 'No'}
//         </Typography>
//       </Box>
//       <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleRentOut}
//           disabled={!book.isAvailable}
//         >
//           {book.isAvailable ? 'RENT OUT' : 'STOCK OUT'}
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleFinishReading}
//           disabled={!canFinishReading} // Disable button based on currentUser check
//         >
//           FINISH READING
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default ViewBook;
