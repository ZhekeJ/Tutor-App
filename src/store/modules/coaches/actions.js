export default {
    async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.firs,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }
        const response = await fetch(`https://tutor-app-53ff5-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            // mode: 'no-cors',
            method: 'PUT',
            body: JSON.stringify(coachData)
        })

       // const responseData = await response.json()

        if(!response.ok){
            //... error
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
   async loadCoaches(context){
      const response = await fetch(`https://tutor-app-53ff5-default-rtdb.firebaseio.com/coaches.json`)

      const responseData = await response.json()

    if(!response.ok){
        //... error
    }
   const coaches = [];
   for  (const key in responseData){
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
   }
   context.commit('setCoaches', coaches)

    }
    
};