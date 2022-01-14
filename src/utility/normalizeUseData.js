const getNewObj = (oldObj,userId) =>{
   return {...oldObj,[userId]:true}
}

const normalizeUserData = (userData)=>{
    const userIdCollection = {};
    const userByAreaCollection = {};
    const userByAgeCollection = {};
    const userByMatchesCollection = {}
    const userByGenderCollection = {}
    const proStatusCollection = {}
    userData.forEach((user,userIndex)=>{
       const {user_id,age,area_id,is_pro_user,total_matches,gender} = user
       userIdCollection[user_id]= user;
      
       userByAreaCollection[area_id] = getNewObj(userByAreaCollection[area_id],user_id)
       
       userByAgeCollection[age]=getNewObj(userByAgeCollection[age],user_id)
       
       userByMatchesCollection[total_matches]=getNewObj(userByMatchesCollection[total_matches],user_id)

       userByGenderCollection[gender]=getNewObj(userByGenderCollection[gender],user_id)
       
      if(is_pro_user){
        proStatusCollection[user_id] = true

      }
    })
 
    return {
         userIdCollection ,
         userByAreaCollection ,
         userByAgeCollection ,
         userByMatchesCollection ,
         userByGenderCollection,
         proStatusCollection,
    }
}

export default normalizeUserData;