import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import LoadingPop from "./LoadingPop";
import Map from "./Map";
import QueryBoard from "./QueryBoard";
import { useSelector } from "react-redux";
const Dashboard = () => {
    const [query,setQuery] = useState('')
    const isDataLoading = useSelector(state => state.user_details.isDataLoading)


  return (
    <Box height='100%'>
    <Box padding='20px' paddingBottom='0px' display = { isDataLoading? 'none': 'block'}>
      <Grid container spacing={2} justifyContent = 'center'>
      <Grid item xs={12} sm={4} >
        <Box >
        <QueryBoard queryValue = {query} updateQuery = {(val)=>setQuery(val)}/>
        </Box>
         
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box style={{  height: "700px", width:'100%',border:"2px solid #6867AC", borderRadius:'10px'}}>
            <Map queryValue ={query}/>
          </Box>
        </Grid>
      </Grid>
      </Box>
      
        {isDataLoading && <LoadingPop/> }
                 
    </Box>
  );
};

export default Dashboard;
