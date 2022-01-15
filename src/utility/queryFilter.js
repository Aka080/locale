export function revenuePerArea (usersInArea,isPro){
   const total_users = Object.keys(usersInArea).length
   let total_pro = 0;
   Object.keys(usersInArea).forEach((userId,idIndex)=>{
       if(isPro[userId]){
           total_pro += 1
       }
   })
   

   const revenue = total_users/total_pro
   console.log('revenue range',revenue)
   return Number(revenue.toFixed(2))

}

export function numberOfUsersPerArea (usersInArea){
    return Object.keys(usersInArea).length
}

export function numberOfMalesInArea(usersInArea,maleUsers){
   let total_males = 0;
    Object.keys(usersInArea).forEach((userId,idIndex)=>{
         if(maleUsers[userId]){
             total_males += 1
         }
    })

    return total_males
}
export function numberOfFemalesInArea(usersInArea,femaleUsers){
    let total_females = 0;
    usersInArea && Object.keys(usersInArea).forEach((userId,idIndex)=>{
         if(femaleUsers[userId]){
             total_females += 1
         }
    })

    return total_females
}

export function malePerFemale(usersInArea,userByGender){
    const total_females  = numberOfFemalesInArea(usersInArea,userByGender.F)
    const total_males = numberOfMalesInArea(usersInArea,userByGender.M)
     
    return Number((total_males/total_females).toFixed(2))
}


export function usersAboveAge(usersInArea,userByAge,forAge){
    let total_users_above = 0;
    //for each user in area
    Object.keys(usersInArea).forEach((userId,idIndex)=>{

        //for each user that belong to a certain age group and current area of reference
        Object.keys(userByAge).forEach((age,ageIndex)=>{

            //check if current user belong to age group
            if(userByAge[age][userId]){

                // get integer value of age
                const ageInNumber = parseInt(age)


                if(!isNaN(ageInNumber) && ageInNumber){

                    // check if age is above query age
                    if(ageInNumber>forAge){
                        total_users_above += 1
                    }
                }
            }
       })
   })

    
   return total_users_above;
}
export function usersBelowAge(usersInArea,userByAge,forAge){
    let total_users_above = 0;
    //for each user in area
    Object.keys(usersInArea).forEach((userId,idIndex)=>{

        //for each user that belong to a certain age group and current area of reference
        Object.keys(userByAge).forEach((age,ageIndex)=>{

            //check if current user belong to age group
            if(userByAge[age][userId]){

                // get integer value of age
                const ageInNumber = parseInt(age)


                if(ageInNumber !== NaN && ageInNumber){

                    // check if age is above query age
                    if(ageInNumber<forAge){
                        total_users_above += 1
                    }
                }
            }
       })
   })

    
   return total_users_above;
}


