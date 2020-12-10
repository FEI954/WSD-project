import {nowDate,validForm,morning_data} from"../../services/morningService.js";
import{morning} from "../../services/reportingService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";

const showMorningForm = async({render,session}) => {
    morning_data.errors=[];
    morning_data.sleepDuration='';
    //morning_data.sleepQuality='';
    //morning_data.genericMood='';
    const ifLogin = await morning(session);
    if (ifLogin) {  
        await nowDate();
        //console.log(morning_data);
        render('reporting_morning.ejs',{ifLogin: ifLogin, email: average.email, day:morning_data.day, month:morning_data.month, year: morning_data.year, sleepDuration: morning_data.sleepDuration, sleepQuality: morning_data.sleepQuality, genericMood: morning_data.genericMood, morningTrue: morning_data.morningTrue, errors: morning_data.errors});
    } else {
        render('login.ejs',{errors:[]});
    }
}

const submitMorningForm = async ({request, render,response,session}) => {
    const body = request.body();  
    const params = await body.value;
    //const day = document.querySelector('#day').value;
    //const month = document.querySelector('#month').value;
    //const year = document.querySelector('#year').value;
    //const date = `${day}--${month}--${year}`;
    const day=params.get('day');
    const month=params.get('month');
    const year= params.get('year');
    const date = `${year}--${month}--${day}`;
    const sleepDuration =params.get('sleepDuration');
    const sleepQuality = params.get('sleepQuality');
    const genericMood = params.get('genericMood');

    const valid = await validForm({date, sleepDuration, sleepQuality, genericMood,session});
    if(valid){
        response.body = 'Successful Reportinig!';
    }else{
        render('reporting_morning.ejs',morning_data);
    }
}

export { showMorningForm, submitMorningForm };