// import mapData from "./data/countries.json";
import { useEffect,useState } from 'react';
import axios from 'axios';

const useGetData = (locationEndpoint,userEndpoint) => {
    const [isDataLoading,setIsDataLoading] = useState(false)
    const [mapData,setMapData] = useState('')
    const [error,setError] = useState('')
    const [userData,setUserData] = useState('')
 
   useEffect(()=>{
     setIsDataLoading(true)
     try{
       axios.get(locationEndpoint).then(
         (res)=>{
           setMapData(res.data)
         }
       )
       axios.get(userEndpoint).then(
         (res)=>{
           setUserData(res.data)
         }
       )
 
     }catch(error) {
       setIsDataLoading(false)
       setError(error)
     }

    return ()=>{
        setIsDataLoading(false)
        setMapData({})
        setUserData([])
    }
   },[])

   useEffect(()=>{
    if(isDataLoading){ 
         if(mapData && userData){
          setIsDataLoading(false)
      }
    }
    return ()=>{
        setIsDataLoading(false)
    }
   },[mapData,userData])
   
   
   return {isDataLoading,mapData,userData,error}
}
export default useGetData;