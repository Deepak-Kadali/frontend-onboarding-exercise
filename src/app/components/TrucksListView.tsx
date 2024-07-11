import React, { useContext } from 'react';
import DataContext from '../DataContext';
import { Link,useNavigate   } from 'react-router-dom';

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

const TrucksListView = () => {
  const value = useContext(DataContext);
  const navigate = useNavigate();
  const handleRowClick = (id:number) => {
    navigate(`/Trucks-Details/:${id}`)
  }
  return (
    <>
     <div>
      
      <Link to={`/Trucks-Details/:${value?.TrucksState.length}`}>
        <Button variant="contained">ADD Truck</Button>
      </Link>
    </div>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year of Release</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Permits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.TrucksState.map((truck, index) => (
            <TableRow key={index} onClick= {()=>handleRowClick(truck.id)} style={{textDecoration:"none",cursor:"pointer"}}>
                <TableCell>{truck.name}</TableCell>
                <TableCell>{truck.model}</TableCell>
                <TableCell>{truck.yearOfRelease}</TableCell>
                <TableCell>{truck.brand}</TableCell>
                <TableCell>
                  <ul>
                    {truck.permits.map((permit, idx) => (
                      <li key={idx}>{`${permit.state}`}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  );
};

export default TrucksListView;
