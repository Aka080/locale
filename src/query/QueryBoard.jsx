import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography  from '@mui/material/Typography';
import QueryItems from './QueryItems';
import MapScale from './MapScale';
import Divider  from '@mui/material/Divider';


const QueryBoard = ()=>{
  const [showScale,setShowScale] = React.useState(false)
  return <Box>
      <Grid container  >
        <Grid item xs={12} >
          <Box sx={{background:'#6867AC', paddingTop:'10px', borderRadius:'10px'}}>
          <Typography variant="h3" component="h2" align='center' sx={{color:'white', fontWeight:600, fontFamily:'Vidaloka, serif', fontSize:'30px'}}>
            Visualize
           </Typography>;
          </Box>
          
           <Divider />
        </Grid>
          <Grid item xs={12} >
            <Box marginTop='20px'>
              <QueryItems setShow= {setShowScale} showScale={showScale}/>
            </Box>
              
          </Grid>
        <Grid item xs={12}>
          
          { showScale && <MapScale/>}
        </Grid>
      </Grid>
    

  </Box>
}

export default QueryBoard