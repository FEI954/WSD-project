

import { ifLogin, getAverage,weekly_data, searchAverage } from "../../services/weeklyService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";

const showWeekly = async({render,session}) => {
    // morning_data.errors=[];
    // morning_data.sleepDuration='';
    //morning_data.sleepQuality='';
    //morning_data.genericMood='';
    const ifLogin = await ifLanding(session);

    if (ifLogin) {  
        //console.log(morning_data);
        await getAverage(session);
        //console.log(data);
        //console.log('_____________', res)
        render('weekly.ejs',weekly_data);
    } else {
        render('login.ejs',{errors:[]});
    }
}

const submitWeekly = async({request, render, response,session}) => {
    const body = request.body();  
    const params = await body.value;
    
    const dayFrom=params.get('dayFrom');
    const monthFrom=params.get('monthFrom');
    const yearFrom= params.get('yearFrom');

    const dayTo=params.get('dayTo');
    const monthTo=params.get('monthTo');
    const yearTo= params.get('yearTo');
    weekly_data.dayFrom = dayFrom;
    weekly_data.monthFrom = monthFrom;
    weekly_data.yearFrom = yearFrom;
    weekly_data.dayTo = dayTo;
    weekly_data.monthTo = monthTo;
    weekly_data.yearTo = yearTo;
    await searchAverage({session, dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo});
    render('weekly.ejs',weekly_data);;
}

export { showWeekly, submitWeekly};