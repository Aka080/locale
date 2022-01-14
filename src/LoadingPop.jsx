import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingPop = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      <Box
        sx={{ borderRadius: "10px" }}
      >
        <Paper sx={{width:'100%',height:'100%' }} elevation ={2}>
          {/* <LinearProgress /> */}
          <Typography variant='h4' align='center'>Loading..</Typography>
          <Typography variant="body1" sx={{ marginTop: "20px" ,fontWeight:600,padding:'10px'}}>
            API endpoint has very slow response rate, please wait while data
            gets loaded, if page becomes unresponsive referesh and try again.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoadingPop;
