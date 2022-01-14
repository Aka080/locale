import Dashboard from "./Dashboard";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Map from "./Map";

function App() {
  return (
    <Box display='flex' justifyContent = 'center' alignItmes ='center'   sx={{background:'#6867AC', height:'100%'}}>
      <Paper sx={{ width: "95%" ,marginTop:'2%',height:'100%'}}>
        <Dashboard />
      </Paper>
    </Box>
  );
}

export default App;
