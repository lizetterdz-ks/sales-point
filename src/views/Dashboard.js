import React, { useEffect, useState } from 'react';
import LayoutContainer from '../components/LayoutContainer';
import { CircularProgress, Grid, Paper } from '@mui/material'
import Items from '../components/Items';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sales-point-server.herokuapp.com/items').then(res => {
      if(res.ok) {
        return res.json();  
      }
    }).then(jsonRes => {
      setItems(jsonRes);
      setLoading(false);
    })
  },[])

  return (
    <LayoutContainer>
      {
        loading ?
        <>
          <h2>Loading...</h2>
          <CircularProgress />
        </>
        :
        <>
          <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '85vh'}}>
                  <h2>Products</h2>
                  <Items data={items} />
                </Paper>
              </Grid>
        </>
      }
    </LayoutContainer>
  )
}

export default Dashboard;