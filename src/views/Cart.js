import LayoutContainer from '../components/LayoutContainer';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Typography, TextField } from '@mui/material';
import { CartList } from '../components/Items';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [bill, setBill] = useState(0);
  let total = 0;
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleBillChange = (event) => {
    setBill(event.target.value);
  }

  const handleSell = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    setOpen(false);
    fetch('https://sales-point-server.herokuapp.com/sales', {
      method: 'POST',
      body: JSON.stringify({
        products: CartList,
        total: total,
        date: date,
        status: "Successful"
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })

    CartList.forEach((item) => handleUpdateTimesSold(item._id, item.stock, item.timesSold));

    setSuccessOpen(true);
  }

  const handleUpdateTimesSold = (id, stock, timesSold) => {
    let newTimesSold = timesSold+1;
    let newStock = stock-1;
    fetch(`https://sales-point-server.herokuapp.com/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        stock: newStock,
        timesSold: newTimesSold,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
  }
  
  CartList.forEach((item) => total+=item.price);
  return (
    <LayoutContainer>
        <Box>
        <h2>Cart</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '60vw' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CartList.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" sx={{margin: 2}} 
        onClick={handleOpen}>
          Proceed to payment
        </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Total
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="h2" sx={{marginTop: 2, marginBottom: 2}}>
            The total of the sell is: {total}
          </Typography>
          <TextField
          label="Customer's Bill"
          placeholder="e.g.: 200"
          type="number"
          name="bill"
          value={bill}
          onChange={handleBillChange}
          fullWidth
          variant="outlined"
          sx={{marginTop: 2, marginBottom: 2}}
          >
          </TextField>
          <Typography id="modal-modal-title" variant="body1" component="h2">
            The change is: {bill-total>0 ? bill-total : "Not enough money from customer"}
          </Typography>
          <Button
          fullWidth
          sx={{marginTop: 2}}
          onClick={handleSell}
          >Finish sell 
          </Button>
        </Box>
      </Modal>
      <Modal
          open={successOpen}
          onClose={() => navigate('/dashboard')}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SALE WAS SUCCESSFUL!!
              </Typography>
              <Button
              sx={{marginTop: 2}}
              onClick={() => navigate('/dashboard')}>
                Go to dashboard
              </Button>
            </Box>
          </Modal>
      </Box>
    </LayoutContainer>
  )
}

export default Cart;