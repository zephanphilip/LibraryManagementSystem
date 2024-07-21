import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WorkoutDetails({ bdetail }) {
  const navigate = useNavigate();

  const handleRentOut = async () => {
    if (!bdetail.isAvailable) return;

    navigate(`/viewbook/${bdetail._id}`);
  };

  const handleViewBook = () => {
    navigate(`/viewbook/${bdetail._id}`);
  };
  console.log(bdetail.image);
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" component="h4" gutterBottom>
        {bdetail.title}
      </Typography>
      <Box>
      {bdetail.image && (
          <img
            src={`http://localhost:4000/${bdetail.image}`}
            
            alt={bdetail.title}
            style={{
              width: '100%',
              maxWidth: '200px', // Set maximum width
              height: 'auto', // Maintain aspect ratio
              marginBottom: '16px',
            }}
          />
        )}
        <Typography variant="body1">
          <strong>Serial No:</strong> {bdetail.serialNo}
        </Typography>
        <Typography variant="body1">
          <strong>Author:</strong> {bdetail.author}
        </Typography>
        <Typography variant="body1">
          <strong>Publication Year:</strong> {bdetail.publicationYear}
        </Typography>
        <Typography variant="body1">
          <strong>Genre:</strong> {bdetail.genre}
        </Typography>
        <Typography variant="body1">
          <strong>ISBN:</strong> {bdetail.isbn}
        </Typography>
        <Typography variant="body1">
          <strong>Available:</strong> {bdetail.isAvailable ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDistanceToNow(new Date(bdetail.createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRentOut}
          disabled={!bdetail.isAvailable}
        >
          {bdetail.isAvailable ? 'RENT OUT' : 'STOCK OUT'}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewBook}
        >
          VIEW BOOK
        </Button>
      </Box>
    </Paper>
  );
}

export default WorkoutDetails;
