import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider  from '@mui/material/Divider';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { revenuePerAreaColorCode, malePerAreaColorCode, femalePerAreaColorCode, malePerFemaleColorCode, numberOfUsersPerAreaColorCode,
ageColorCode  } from "./utility/colorShades";


const MapScale = () => {
    const [scaleForCurrentQuery,setScaleForCurrentQuery] = useState([]);
    const [queryTitle,setQueryTitle] = useState('')
    const queryValue = useSelector(state =>state.user_details.queryItem)
    const filterAge = useSelector(state => state.user_details.filterAge)
    


    useEffect(()=>{

        if(queryValue === 10){
          setScaleForCurrentQuery([...revenuePerAreaColorCode])
          setQueryTitle('Revenue per area')
        }
        if(queryValue === 20){
            setScaleForCurrentQuery([...numberOfUsersPerAreaColorCode])
          setQueryTitle('Users per area')

        }
        if(queryValue === 30){
            setScaleForCurrentQuery([...malePerFemaleColorCode])
            setQueryTitle('Males per Female in Area')

        }
        if(queryValue === 40){
            setScaleForCurrentQuery([...malePerAreaColorCode])
            setQueryTitle('Number of males in area')

        }
        if(queryValue === 50){
            setScaleForCurrentQuery([...femalePerAreaColorCode])
            setQueryTitle('Number of females in area')

        }
        if(queryValue === 60 || queryValue === 70){
          setScaleForCurrentQuery([...ageColorCode])
          if(queryValue === 70){
          setQueryTitle(`Number of users below age ${filterAge}`)
        }else {
          setQueryTitle(`Number of users above age ${filterAge}`)
        }

      }
      
        if(queryValue === 0){
            setScaleForCurrentQuery([])
        }

    },[queryValue])
  return (
    (queryValue > 1) && <Paper sx={{width:'95%', padding:'10px'}}>
      <Grid>
        <Grid item>
          <Box padding='5px'>
            <Typography variant= 'h6' component="h2">
              {queryTitle}
            </Typography>
            <Divider />

          </Box>
        </Grid>
        <Grid item>
          <Box>
             


                {
                scaleForCurrentQuery.map((scale,scaleIndex)=>{
                return  <Box marginBottom='10px'>
                    <Grid container >
                <Grid item xs={6}>
                  <Box display='flex' justifyContent={'center'}>
                  {scale.low} - {scale.high}
                  </Box>
                    
                </Grid>
                <Grid item xs={6}>
                    <Box width='100%' height='50px' bgcolor={scale.color_code}/>
                </Grid>
                </Grid>
                </Box>
                }) 
                }  
                  
              
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default MapScale;
