import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setQueryItem ,setFilterAge} from '../store/userSlice';
import  TextField  from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { Box } from '@mui/material';

export default function QueryItems({showScale,setShow}) {
    const dispatch = useDispatch()
  const queryItem = useSelector(state=>state.user_details.queryItem)
  const [queryValue, setQueryValue] = React.useState('');
  const [age,setAge] = React.useState('')

  const handleQueryChange = (event) => {
    setQueryValue(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  
  };
  const onSubmit = ()=>{
    setShow(true)
    dispatch(setQueryItem(queryValue))
    console.log('age value',age,queryValue)
    dispatch(setFilterAge(Number(age)))
  }
  React.useEffect(()=>{
    if(queryValue === queryItem){
      setShow(true)
    }
    if(queryValue !== queryItem){
      if(showScale){
        setShow(false)
        dispatch(setQueryItem(0))
      }

    }

    if((queryValue !== 60) && (queryValue !== 70)){
      if(age){
        setAge('')
      }
    }
    
  },[queryValue])
 
  return (
    <div>
   
      <FormControl  sx={{ m:1 , marginLeft: 0, minWidth: "100%" }} >
        <InputLabel id="demo-simple-select-required-label"
       >Your Query</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={queryValue}
          label="Select a Query"
          onChange={handleQueryChange}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Revenue per area</MenuItem>
          <MenuItem value={20}>Number of users per area</MenuItem>
          <MenuItem value={30}>Male/Female users in the area</MenuItem>
          <MenuItem value={40}>Number of male users in the area</MenuItem>
          <MenuItem value={50}>Number of female users in the area</MenuItem>
          <MenuItem value={60}>Users above age</MenuItem>
          <MenuItem value={70}>Users below age</MenuItem>
        </Select>
      </FormControl>
      <Box minHeight = '60px'>
     { ((queryValue === 60) || (queryValue === 70)) && <TextField
          id="Age-value"
          label="Enter Age"
          value={age}
          onChange={handleAgeChange}
          // placeholder="Enter Age"
          error={age<1}
        />}
      </Box>
      <Box display='flex' justifyContent = 'center'marginTop = '10px'>
      <Button variant="contained"
      
      disabled = {
        ((queryValue === 60) || (queryValue === 70)) && age<1 
      }
      onClick={onSubmit}
      size='large'
      sx={{fontWeight:500}}
      >SUBMIT</Button>
      </Box>
       
    </div>
  );
}
