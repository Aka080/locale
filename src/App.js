import Dashboard from "./dashboard/Dashboard";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Map from "./map/Map";

function App() {
  return (
    <Box display='flex' justifyContent = 'center' alignItmes ='center'   sx={{background:'#6867AC' , height:'100%'}}>
      <Paper sx={{ width: "95%" ,marginTop:'2%',height:'100%',marginBottom:'2%',paddingBottom:'20px'}}>
        <Box>
        <Dashboard />
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
