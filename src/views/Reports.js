import LayoutContainer from '../components/LayoutContainer';
import { CircularProgress, Grid, Paper, Divider, Card, CardContent, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Sales from '../components/Sales';
import Graph from '../components/Graph';
import Totals from '../components/Totals';

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noSales, setNoSales] = useState(false);
  const [successfulSales, setSuccessfulSales] = useState([]);
  const [canceledSales, setCanceledSales] = useState([]);
  const [salesCount, setSalesCount] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);

  useEffect(() => {
    fetch('https://sales-point-server.herokuapp.com/sales').then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => {
      setSales(jsonRes);
    }).then(() => {
      fetch('https://sales-point-server.herokuapp.com/items').then(res => {
      if(res.ok) {
        return res.json();
      }
      }).then(jsonRes => {
        setItems(jsonRes);
        setLoading(false);
      })
    })
  },[])

  useEffect(() => {
    if(sales.message === "There are no sales yet" ){
      setNoSales(true);
    } else {
      setSuccessfulSales(sales.filter((sale) => sale.status === "Successful"));
      setCanceledSales(sales.filter((sale) => sale.status === "Canceled"));
    }
    
  }, [sales])

  useEffect(()=> {
    setSalesCount(items.map((item) => ({times: item.timesSold, item: item.name})))
  }, [items])

  useEffect(() => {
    salesCount.sort((a,b) => a.times - b.times);
    setTop(salesCount.slice(salesCount.length-3).reverse());
    setBottom(salesCount.slice(0,3));
  },[salesCount])

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
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', marginTop: 170}}>
              {
                noSales ?
                <>
                <h2>{sales.message}</h2>
                </>
                :
                <>
                <h2>Reports</h2>
                <Divider/>
                <Totals successfulSales={successfulSales} canceledSales={canceledSales}/>
                <Graph data={sales}/>
                <Divider />
                <h3>Top sold</h3>
                <Box sx={{display: 'flex', marginBottom: 3}}>
                  {top.map((item, p) => (
                    <Card key={p} sx={{width: 200, maxHeight: 200, marginRight: 5, marginTop: 3, marginBottom: 3}}>
                      <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        #{p+1} most sold product
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginTop: 1 }} color="#615AE1">
                        Item name:      {item.item}              
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginTop: 1 }} color="#615AE1">
                        Times sold: {item.times}
                      </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Divider />
                <h3>Least sold</h3>
                <Box sx={{display: 'flex', marginBottom: 3}}>
                  {bottom.map((item, p) => (
                    <Card key={p} sx={{width: 200, maxHeight: 200, marginRight: 5, marginTop: 3, marginBottom: 3}}>
                      <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        #{p+1} least sold product
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginTop: 1 }} color="#C74B4F">
                        Item name:      {item.item}              
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginTop: 1 }} color="#C74B4F">
                        Times sold: {item.times}
                      </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Divider />
                <h3>All sales (includes canceled)</h3>
                <Sales data={sales}/> 
                </>
              }
            </Paper>
          </Grid>
        </>
      }
    </LayoutContainer>
  )
}

export default Reports;