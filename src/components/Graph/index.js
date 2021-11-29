import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';

export default function Graph ({data}) {
  return (
    <LineChart width={600} height={350} data={data} margin={{ top: 5, right: 30, left: 0, bottom: 50 }}>
      <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={1.5} dot={true}/>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date">
        <Label value="Date" offset={0} position="bottom" />
      </XAxis>
      <YAxis >
          <Label value="Sales money flow (USD)" angle={-90} position="insideBottomLeft" offset={13}/> 
      </YAxis>
    </LineChart>
  )
};
