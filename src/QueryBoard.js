import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography  from '@mui/material/Typography';
import QueryItems from './QueryItems';
import MapScale from './MapScale';
import Divider  from '@mui/material/Divider';


const QueryBoard = ()=>{
  return <Box>
      <Grid container >
        <Grid item >
          <Box sx={{background:'#6867AC', paddingTop:'10px', borderRadius:'10px'}}>
          <Typography variant="h3" component="h2" align='center' sx={{color:'white', fontWeight:600, fontFamily:'Vidaloka, serif'}}>
            Visualize
           </Typography>;
          </Box>
          
           <Divider />
        </Grid>
          <Grid item >
            <Box marginTop='20px'>
              <QueryItems/>
            </Box>
              
          </Grid>
        <Grid item >
          <MapScale/>
        </Grid>
      </Grid>
    

  </Box>
}

export default QueryBoard