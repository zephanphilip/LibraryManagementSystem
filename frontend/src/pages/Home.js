import React, { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
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
  },
});

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={4} mt={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              BOOKS LIST
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              {workouts && workouts.map((bdetail) => (
                <Paper key={bdetail._id}>
                  <WorkoutDetails bdetail={bdetail} />
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;

// import React, { useState, useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import WorkoutDetails from '../components/WorkoutDetails';
// import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#b71c1c', // Blood red
//     },
//     secondary: {
//       main: '#ffffff', // White
//     },
//   },
//   typography: {
//     h6: {
//       fontWeight: 600,
//     },
//   },
// });

// function Home() {
//   const { workouts, dispatch } = useWorkoutsContext();
//   const { user } = useAuthContext();
  

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       const response = await fetch('http://localhost:4000/api/workouts', {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });
//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'SET_WORKOUTS', payload: json });
//       }
//     };

    

//     if (user) {
//       fetchWorkouts();
      
//     }
//   }, [dispatch, user]);

  

//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <Grid container spacing={4} mt={3}>
//             <Typography variant="h4" component="h1" gutterBottom>
//               BOOKS LIST
//             </Typography>
//             <Box>
//               {workouts && workouts.map((bdetail) => (
//                 <WorkoutDetails key={bdetail._id} bdetail={bdetail} />
//               ))}
//             </Box>
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default Home;


