import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';

export let CartList = [];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: '_id', headerName: 'ID', width: 220 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'stock',
    headerName: 'stock',
    type: 'number',
    width: 110,
    editable: true,
  }
];

export default function DataGridDemo({data}) {
  const [selection, setSelection] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledDelete, setDisabledDelete] = useState(true);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemStock, setItemStock] = useState(0);

  data.map((item) => item.id = item._id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelection = (select) => {
    setSelection(select);
    if(select.length === 0){
      setDisabled(true);
      setDisabledDelete(true);
    } else {
      setDisabled(false);
      setDisabledDelete(false);
    }

    if (select.length >1) {
      setDisabledDelete(true);
    }
  }

  const handleAddCart = () => {
    let rows=[];
      for (let i=0; i<selection.length; i++){
        rows=rows.concat(data.filter((item) => item._id === selection[i])); 
      }
    CartList = rows;
    setAmount(CartList.length);
  }

  const handleDelete = () => {
    let id = selection;
    fetch(`https://sales-point-server.herokuapp.com/items/${id}`, {
      method: 'DELETE',
      mode: 'no-cors',
      body: JSON.stringify({
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

  const handleAddNew = () => {
    fetch('https://sales-point-server.herokuapp.com/items', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        name: itemName,
        price: itemPrice,
        stock: itemStock,
        timesSold: 0
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

  const handleName = (event) => {
    setItemName(event.target.value);
  };
  const handlePrice = (event) => {
    setItemPrice(event.target.value);
  };
  const handleStock = (event) => {
    setItemStock(event.target.value);
  };

  return (
    <div style={{ height: 400, width: '80vw' }}>
      <Button disabled={disabled}
      onClick={handleAddCart}>ADD TO CART ({amount})</Button>
      <Button disabled={disabledDelete}
      onClick={handleDelete}>DELETE</Button>
      <Button
      onClick={handleOpen}>ADD NEW PRODUCT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add product
          </Typography>
          <form onSubmit={handleAddNew}>
            <div>
              <TextField
              label="Name"
              placeholder="e.g.: ITEM 12"
              type="text"
              name="name"
              required
              value={itemName}
              onChange={handleName}
              fullWidth
              variant="outlined"
              sx={{ margin: 1}}>
              </TextField>
              <TextField
              label="Price"
              placeholder="e.g.: 10"
              type="number"
              name="price"
              required
              value={itemPrice}
              onChange={handlePrice}
              fullWidth
              variant="outlined"
              sx={{ margin: 1}}>
              </TextField>
              <TextField
              label="Stock"
              placeholder="e.g.: 50"
              type="number"
              name="stock"
              required
              value={itemStock}
              onChange={handleStock}
              fullWidth
              variant="outlined"
              sx={{ margin: 1}}>
              </TextField>
            </div>
            <Button
            type="submit"
            fullWidth
            >Submit</Button>
          </form>
        </Box>
      </Modal>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(select) => handleSelection(select)}
      />
    </div>
  );
}
