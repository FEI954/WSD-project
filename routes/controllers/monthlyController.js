import { ifLogin, getAverageMonth, monthly_data, searchAverageMonth} from "../../services/monthlyService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";

// const showMonthly = async({render,session}) => {
//     // morning_data.errors=[];
//     // morning_data.sleepDuration='';
//     //morning_data.sleepQuality='';
//     //morning_data.genericMood='';
//     const ifSummaryLogin = await ifLogin(session);
//     if (ifSummaryLogin) {  
//         //console.log(morning_data);
//         render('monthly.ejs');
//     } else {
//         render('login.ejs',{errors:[]});
//     }
// }

// export { showMonthly };

const showMonthly = async({render,session}) => {
    // morning_data.errors=[];
    // morning_data.sleepDuration='';
    //morning_data.sleepQuality='';
    //morning_data.genericMood='';
    const ifLogin = await ifLanding(session);

    if (ifLogin) {  
        //console.log(morning_data);
        await getAverageMonth(session);
        //console.log(data);
        //console.log('_____________', res)
        render('monthly.ejs',monthly_data);
    } else {
        render('login.ejs',{errors:[]});
    }
}

const submitMonthly = async({request, render, response,session}) => {
    const body = request.body();  
    const params = await body.value;
    
    const month=params.get('month');
    const year= params.get('year');

    monthly_data.month = month;
    monthly_data.year = year;

    await searchAverageMonth({session, month, year});
    render('monthly.ejs',monthly_data);
}

export { showMonthly, submitMonthly };