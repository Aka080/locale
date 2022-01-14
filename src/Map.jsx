import { MapContainer, TileLayer, Marker, Popup,GeoJSON,Polygon, Polyline } from 'react-leaflet'
import {useEffect,useRef,useState} from 'react'
import normalizeUserData from './utility/normalizeUseData';
import { useDispatch,useSelector } from 'react-redux';
import { setUserByAge,setNumberOfUsers,setUserByGender,setUserById,setUsersByArea,setIsPro,setUserByMatches,initialState ,setIsDataLoading} from './store/userSlice';
import { revenuePerAreaColorCode, malePerAreaColorCode, femalePerAreaColorCode, malePerFemaleColorCode, numberOfUsersPerAreaColorCode,ageColorCode  } from "./utility/colorShades";
import {revenuePerArea,numberOfUsersPerArea,numberOfMalesInArea,numberOfFemalesInArea,malePerFemale,usersAboveAge,usersBelowAge} from './utility/queryFilter';
import axios from 'axios';
import popupHtml from './popupHtml';
import useGetData from './hooks/useGetData';


//delete icon and modify
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('./images/marker-icon-2x.png'),
//   iconUrl: require('./images/marker-icon.png'),
//   shadowUrl: require('./images/marker-shadow.png')
// });

const LOCATION_ENDPOINT = 'https://kyupid-api.vercel.app/api/areas'
const USER_ENDPOINT = 'https://kyupid-api.vercel.app/api/users'
const countryStyle = {
  fillColor: "",
  fillOpacity: 0.2,
  color: "blue",
  weight: 1,
};


const Map = ()=>{
    const dispatch = useDispatch()
   const vcolors = ["green", "blue", "yellow", "orange", "grey"];
    
    const userById = useSelector(state =>state.user_details.userById)

    // get global states
    const userByArea = useSelector (state =>state.user_details.userByArea)
    const queryValue = useSelector(state =>state.user_details.queryItem)
    const isPro = useSelector(state => state.user_details.isPro)
    const userByGender = useSelector(state => state.user_details.userByGender)
    const userByAge = useSelector(state => state.user_details.userByAge)
    const filterAge = useSelector(state => state.user_details.filterAge)
    const isDataLoading = useSelector(state=>state.user_details.isDataLoading)


    const [mapData,setMapData] = useState([])
    const [isNormalizing,setIsNormalizing] = useState(false)
    const [error,setError] = useState('')
    const [userData,setUserData] = useState('')

  
   

  // request data and set loading state to true
    useEffect(()=>{
      // setIsDataLoading(true)
      try{
        axios.get(LOCATION_ENDPOINT).then(
          (res)=>{
            setMapData(res.data.features)
          }
        )
        axios.get(USER_ENDPOINT).then(
          (res)=>{
            setUserData(res.data)
          }
        )
  
      }catch(error) {
        dispatch(setIsDataLoading(false))
        setError(error)
      }
 
     return ()=>{
         setMapData([])
         setUserData([])
     }
    },[])
 

    // after data update set loading state to false
    useEffect(()=>{
      if(isDataLoading){ 
           if(mapData && userData){
            dispatch(setIsDataLoading(false))
        }
      }
     },[mapData,userData])
    

    // update global state with normalized data
    useEffect(()=>{
      const users =  userData.users||[]

      // get normalized data
      const {userIdCollection,
        userByAreaCollection,
        userByAgeCollection,
        userByMatchesCollection,
        userByGenderCollection,
        proStatusCollection} = normalizeUserData(users);
   
       if(users.length > 0){
        setIsNormalizing(true)
        dispatch(setUserById(userIdCollection));
        dispatch(setIsPro(proStatusCollection));
        dispatch(setUserByMatches(userByMatchesCollection));
        dispatch(setNumberOfUsers(users.length));
        dispatch(setUsersByArea(userByAreaCollection));
        dispatch(setUserByGender(userByGenderCollection));
        dispatch(setUserByAge(userByAgeCollection));

       }
        
       // clear all states on unmount
        return ()=>{
          dispatch(setUserById(initialState.userById));
          dispatch(setIsPro(initialState.isPro));
          dispatch(setUserByMatches(initialState.userByMatches));
          dispatch(setNumberOfUsers(initialState.numberOfUsers));
          dispatch(setUsersByArea(initialState.userByArea));
          dispatch(setUserByGender(initialState.userByGender));
          dispatch(setUserByAge(initialState.userByAge));

        }
    },[userData])

    useEffect(()=>{
      const id =  userData && userData.users[0].user_id
      if(id){
        if( userById[id]){
          setIsNormalizing(false)
        }
      }
    
    },[userById,userData])

    const onEachDistrict = (district, layer) => {
    const districtName = district.properties.name;
    const area_id = district.properties.area_id
    const usersInArea = userByArea[area_id]
    // const popupContent = ReactDOMServer.renderToString(<Popup/>)
    if(queryValue === 10){
         
          const revenue = revenuePerArea(usersInArea,isPro)
          const  scale = revenuePerAreaColorCode.find((colorScale,scaleIndex)=>{
             if(revenue>=colorScale.low && revenue<colorScale.high){
               return true;
             }
          })
          const PopupHtml = popupHtml(districtName,revenue,'Revenue')
          console.log(PopupHtml)
          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);
          
          // console.log('revenue----',revenue)
    }
    if(queryValue === 20){
      const usersPerArea = numberOfUsersPerArea(usersInArea)
      const  scale = numberOfUsersPerAreaColorCode.find((colorScale,scaleIndex)=>{
        if(usersPerArea>=colorScale.low && usersPerArea<colorScale.high){
          return true;
        }
      })
          const PopupHtml = popupHtml(districtName,usersPerArea,'Users')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);

    }
    if(queryValue === 30){
      const maleFemaleRatio = malePerFemale(usersInArea,userByGender)

      const  scale = malePerFemaleColorCode.find((colorScale,scaleIndex)=>{
        if(maleFemaleRatio>=colorScale.low && maleFemaleRatio<colorScale.high){
          return true;
        }
     })
          const PopupHtml = popupHtml(districtName,maleFemaleRatio,'Males Per Female')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);


    }
    if(queryValue === 40){
      const malesInArea = numberOfMalesInArea(usersInArea,userByGender.M)
      console.log('user in are', malesInArea)
      const  scale = malePerAreaColorCode.find((colorScale,scaleIndex)=>{
        if(malesInArea>=colorScale.low && malesInArea<colorScale.high){
          return true;
        }
     })
     const PopupHtml = popupHtml(districtName,malesInArea, 'Males')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);

    }
    if(queryValue === 50){
      
      const femalesInArea = numberOfFemalesInArea(usersInArea,userByGender.F)
      console.log('user in are', femalesInArea)
      const  scale = femalePerAreaColorCode.find((colorScale,scaleIndex)=> {
        if(femalesInArea>=colorScale.low && femalesInArea<colorScale.high){
          return true;
        }
     })
     const PopupHtml = popupHtml(districtName,femalesInArea, 'Females')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);


       
    }
    if(queryValue === 60){
       const aboveAge = usersAboveAge(usersInArea,userByAge,filterAge)

       const  scale = ageColorCode.find((colorScale,scaleIndex)=> {
        if(aboveAge>=colorScale.low && aboveAge<colorScale.high){
          return true;
        }
     })
     const PopupHtml = popupHtml(districtName,aboveAge, 'Users')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);

    }
    if(queryValue === 70){
      const belowAge = usersBelowAge(usersInArea,userByAge,filterAge)

      const  scale = ageColorCode.find((colorScale,scaleIndex)=> {
        if(belowAge>=colorScale.low && belowAge<colorScale.high){
          return true;
        }
     })
     const PopupHtml = popupHtml(districtName,belowAge, 'Users')

          layer.options.fillOpacity = 1;
          layer.options.color= "black"
          layer.options.fillColor = scale.color_code;
          layer.bindPopup(PopupHtml);

    }

    // const jhtml = '<html><head><style>table, th, td{border: 1px solid black; border-collapse: collapse;}th, td{padding: 5px; text-align: left;}</style></head><body><table style="width: 100% ; min-width:250px"><tr> <th style="width:20% ; background: green; color: white;font-size:16px">Area Name:</th> <td style="font-size:16px" >details</td></tr><tr> <th style="width:40% ; background: green; color: white;font-size:16px">Data:</th> <td style="font-size:16px" >numbers</td></tr></table></body></html>'
    
    // layer.options.fillOpacity = Math.random(); 
    // layer.on({
    //   click: this.changeCountryColor,
    // });
  };



/* RETURN SCREENS */
    // if(isDataLoading){
    //   return <div>Loading.....</div>
    // }
    if(isNormalizing){
      return <div> Organising your data....</div>
    }

    return (mapData.length>0) && <MapContainer  center={[12.983333,77.583333]} zoom={11.2} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   <GeoJSON
        key={`${queryValue}${filterAge}`}
        style={countryStyle}
        data={mapData}
        onEachFeature={onEachDistrict}
        />
    {/* <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    {/* {mapData.length > 0  && mapData.map((feature,featureIndex)=>{
      console.log('i run with feature',feature,feature.geometry.coordinates)
        return <Polyline pathOptions= {{ color: 'lime' }} positions={feature.geometry.coordinates} />

    })} */}
  </MapContainer>
}

export default Map;