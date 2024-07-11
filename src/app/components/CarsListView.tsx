import React, { useContext } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import DataContext from '../DataContext';
import { Link } from 'react-router-dom';
import { Car } from '../common/types';
const CarsListView = () => {
  const value = useContext(DataContext);
  return (
    <>
      <div>
      
        <Link to={`/Cars-Details/:${value?.CarsState.length}`}>
          <Button variant="contained">ADD</Button>
        </Link>
      </div>
      <Grid container spacing={2}>
        {value?.CarsState &&
          value?.CarsState.map((item : Car) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Link
                  to={`/Cars-Details/:${item.id}`}
                  style={{ textDecoration: 'none' }}
                  className="car-grid"
                >
                  <Paper style={{ padding: 10 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{`Model: ${item.model}`}</Typography>
                    <Typography variant="body2">{`Brand: ${item.brand}`}</Typography>
                    <Typography variant="body2">{`Release: ${item.yearOfRelease}`}</Typography>
                    <Typography variant="body2">{`Color: ${item.color}`}</Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default CarsListView;
