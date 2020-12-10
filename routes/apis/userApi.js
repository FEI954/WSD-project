import { executeCachedQuery } from "../../database/database.js";
// import * as helloService from "../../services/helloService.js";



//我多虑了爆哭
// import { validateLogin, validateErrors, validRegistration, data } from "../../services/userService.js";

// const submitLoginBack = async ({request, session }) => {
//     const body = request.body({type: 'json'});
//     const document = await body.value;
//     email = document.email;
//     password = document.password;
//     errors = validateErrors({email, password});
//     valid = validateLogin({email, password, session});
  
//     response.body = {
//         status: 200,
//         errors: errors,
//         valid: valid
//     };
// };

// const submitRegisterBack = async ({request}) => {
//     const body = request.body();
//     const params = await body.value;
      
//     const email = params.get('email');
//     const password = params.get('password');
//     const verification = params.get('verification');
  
//     valid = validRegistration({email, password, verification});
    
//     response.body = {
//         status: 200,
//         valid: valid,
//         errors: data.errors,
//         email: data.email
//     };
// };

// export { submitLoginBack, submitRegisterBack };
// /api/summary/:year/:month/:day
const specialDay = async({params, render, session,response}) => {
    if (await session.get('authenticated')) {
        // const userId = (await session.get('user')).id;
        const year = params.year;
        const month = params.month;
        const day = params.day;
        const date = `${year}--${month}--${day}`;
        const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date = $1", date);
        const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date = $1", date);

        // const res = await executeCachedQuery("SELECT * FROM mornings WHERE date = $1 AND user_id=$2;", date,userId);
        // const res2 = await executeCachedQuery("SELECT * FROM evenings WHERE date = $1 AND user_id=$2;", date,userId);
        // const a = res[0].sleepduration;
        // const b = res2[0].sporttime;
        // const c = res2[0].studytime;
        // const d = res[0].sleepquality;
        // const e = (res2[0].genericmood + res[0].genericmood) / 2;
        let a = Number(res_mor[0].sleepduration_average).toFixed(2);
        let b = Number(res_eve[0].sporttime_average).toFixed(2);
        let c = Number(res_eve[0].studytime_average).toFixed(2);
        let d = Number(res_mor[0].sleepquality_average).toFixed(2);
        let e = (Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
        // monthly_data.sportTime_average=Number(res_eve[0].sporttime_average);
        // monthly_data.sportTime_average=monthly_data.sportTime_average.toFixed(2);
        // // console.log("+++++++++++++++++++++++++++", monthly_data.sportTime_average);
        // monthly_data.studyTime_average=Number(res_eve[0].studytime_average);
        // monthly_data.studyTime_average=monthly_data.studyTime_average.toFixed(2);
        // monthly_data.sleepQuality_average=Number(res_mor[0].sleepquality_average);
        // monthly_data.sleepQuality_average=monthly_data.sleepQuality_average.toFixed(2);
        // monthly_data.genericMood_average=(Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
        var data = [{"sleepduration": a, "sporttime": b, "studytime": c, "sleepquality": d, "genericmood": e}];
        response.body=JSON.stringify(data)
    } else {
        render('login.ejs',{errors:[]});;
    }
}


const sevenSummary = async({render, session,response}) => {
    if (await session.get('authenticated')) {
        // const userId = (await session.get('user')).id;
        const myDate = new Date();
        const year = myDate.getFullYear();
        let month = myDate.getMonth()+1;
        let day = myDate.getDate();
        if(day > 7){
            let startday = day - 7;
            let startmonth=month;
            let startyear=year;
            if(startday<10){
                startday="0"+startday;
            }
            var startdate = `${startyear}--${startmonth}--${startday}`;
            let endday = day - 1;
            let endmonth=month;
            let endyear=year;
            if(endday<10){
                endday="0"+endday;
            }
            if (endmonth<10){
                endmonth="0"+endmonth;
            }
            var enddate = `${endyear}--${endmonth}--${endday}`;
        }else {
            let startday = day - 7 + 30;
            let startmonth = month - 1;
            let startyear=year;
            if (startday<10){
                startday="0"+startday;
            }
            if(startmonth<10){
                startmonth="0"+startmonth;
            }
            var startdate = `${startyear}--${startmonth}--${startday}`;
            let endday = day - 1;
            let endmonth=month;
            let endyear=year;
            if(endday<10){
                endday="0"+endday;
            }
            if (endmonth<10){
                endmonth="0"+endmonth;
            }
            var enddate = `${endyear}--${endmonth}--${endday}`;
        }
        const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date >= $1 AND date <= $2", startdate, enddate);
        const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date >= $1 AND date <= $2", startdate, enddate);
        let a = Number(res_mor[0].sleepduration_average).toFixed(2);
        let b = Number(res_eve[0].sporttime_average).toFixed(2);
        let c = Number(res_eve[0].studytime_average).toFixed(2);
        let d = Number(res_mor[0].sleepquality_average).toFixed(2);
        let e = (Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
        var data = [{"sleepduration": a, "sporttime": b, "studytime": c, "sleepquality": d, "genericmood": e}];
        response.body=JSON.stringify(data)
    } else {
        render('login.ejs',{errors:[]});;
    }
}
export { specialDay, sevenSummary };