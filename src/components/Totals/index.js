import { Card, CardContent, Typography, Box } from '@mui/material';

export default function Totals({successfulSales, canceledSales}) {
  let balance=0;
  let lost=0;

  return (
    <Box sx={{display: 'flex', marginBottom: 3, marginTop: 3}}>
      <Card sx={{width: 200, maxHeight: 150, marginRight: 5}}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Total successful sales
      </Typography>
      <Typography sx={{ fontSize: 20, marginTop: 1 }} color="green">
        {successfulSales.length}
      </Typography>
      </CardContent>
    </Card>
    <Card sx={{width: 200, maxHeight: 150, marginRight: 5}}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Total balance from sales
      </Typography>
      <Typography sx={{ fontSize: 20, textAlign: "right", marginTop: 1 }} color="green">
        {successfulSales.forEach((sale)=> balance+=sale.total)}
        ${balance}
      </Typography>
      </CardContent>
    </Card>
    <Card sx={{width: 200, maxHeight: 150, marginRight: 5}}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Total canceled sales
      </Typography>
      <Typography sx={{ fontSize: 20, marginTop: 1 }} color="green">
        {canceledSales.length}
      </Typography>
      </CardContent>
    </Card>
    <Card sx={{width: 200, maxHeight: 150}}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Total losts from canceled sales
      </Typography>
      <Typography sx={{ fontSize: 20, textAlign: "right", marginTop: 1 }} color="red">
        {canceledSales.forEach((sale)=> lost+=sale.total)}
        ${lost}
      </Typography>
      </CardContent>
    </Card>
    </Box>
  )
}