import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText} from '@mui/material';

export default function Sales({data}) {
  data.map((sale) => sale.id = sale._id); 

  const handleChangeStatus = (id, saleStatus) => {
    let newStatus;
    if(saleStatus==="Successful"){
      newStatus="Canceled"
    } else {
      newStatus="Successful"
    }
    fetch(`https://sales-point-server.herokuapp.com/sales/${id}`, {
      method: 'PUT',
      mode: 'no-cors',
      body: JSON.stringify({
        status: newStatus,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => {
      if(res.ok) {
        window.location.reload();
        return res.json();
      }
    }) 
  }

  return (
    <div style={{ height: '100vh', width: '80vw' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: '60vw' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((sale) => (
                <TableRow
                key={sale._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{sale._id}</TableCell>
                  <TableCell align="left">
                    <List sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                      position: 'center',
                      overflow: 'auto',
                      maxHeight: '80px',
                    }}>   
                    {sale.products.map((item) => (
                      <div key={item.name}>
                        <ListItem disablePadding sx={{display: 'block'}}>
                          <ListItemText primaryTypographyProps={{ fontSize: '14px' }}>{item.name}</ListItemText>
                          <ListItemText primaryTypographyProps={{ fontSize: '14px' }}>{item._id}</ListItemText>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                    </List>
                  </TableCell>
                  <TableCell align="right">{sale.total}</TableCell>
                  <TableCell align="right">{sale.date}</TableCell>
                  <TableCell align="right">{sale.status}</TableCell>
                  <TableCell>
                  <Button size="small" onClick={() => handleChangeStatus(sale._id, sale.status)}>
                    Change status
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>  
    </div>
  )
}