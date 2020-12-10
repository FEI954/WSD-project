import { ifLogin, submitSummary, data } from "../../services/summaryService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";
import{weekly_data,getAverage}from"../../services/weeklyService.js";
import{monthly_data, getAverageMonth}from"../../services/monthlyService.js";

const showSummary = async({render,session}) => {
    // morning_data.errors=[];
    // morning_data.sleepDuration='';
    //morning_data.sleepQuality='';
    //morning_data.genericMood='';
    const ifLogin = await ifLanding(session);
    if (ifLogin) {  
        await getAverage(session);
        //console.log(morning_data);
        await getAverageMonth(session);
        render('summary.ejs', {weekly_data, monthly_data, ifLogin: ifLogin, email: average.email});
    } else {
        render('login.ejs',{errors:[]});
    }
}

const subSummary = async({request, render, session}) => {
    const body = request.body();  
    const params = await body.value;
    const frequency = params.get('frequency');
    // console.log("++++++++++++++++++", frequency)
    // await submitSummary(frequency);
    // console.log("++++++++++++++++++", data.Weekly)
    // console.log("++++++++++++++++++", data.Monthly)
    if(frequency === 'Weekly'){
        await getAverage(session);
        render('weekly.ejs', weekly_data);
    }
    if(frequency === 'Monthly'){
        await getAverageMonth(session);
        render('monthly.ejs', monthly_data);
    }
}

export { showSummary, subSummary };
