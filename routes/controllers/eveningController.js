import { nowDate, validForm, evening_data} from "../../services/eveningService.js";
import{evening} from "../../services/reportingService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";

const showEveningForm = async({render,session}) => {
    const ifLogin = await evening(session);
    evening_data.errors=[];
    evening_data.studyTime='';
    evening_data.sportTime='';
    if (ifLogin) {
        await nowDate();
        //console.log(evening_data);
        render('reporting_evening.ejs',{ifLogin: ifLogin, email: average.email, day:evening_data.day, month:evening_data.month, year: evening_data.year, sportTime: evening_data.sportTime, studyTime: evening_data.studyTime, genericMood: evening_data.genericMood, eatingQuality: evening_data.eatingQuality, errors: evening_data.errors, eveningTrue: evening_data.eveningTrue});
    } else {
        render('login.ejs',{errors:[]});
    }
}


const submitEveningForm = async ({request, render, response,session}) => {
    const body = request.body();  
    const params = await body.value;
    
    const day=params.get('day');
    const month=params.get('month');
    const year= params.get('year');
    const date = `${year}--${month}--${day}`;
    const sportTime=params.get('sportTime');
    const studyTime = params.get('studyTime');
    const eatingQuality=params.get('eatingQuality');
    const genericMood = params.get('genericMood');

    const valid = await validForm({date, sportTime, studyTime, eatingQuality,genericMood,session});
    if(valid){
        response.body = 'Successful Reporting!';
    }else{
        render('reporting_evening.ejs',evening_data);
    }
}

export { showEveningForm, submitEveningForm };