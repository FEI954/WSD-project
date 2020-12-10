import {morningComplete} from"../../services/morningService.js";
import {eveningComplete} from"../../services/eveningService.js";
import{ifLanding, average, trendLanding} from "../../services/landingService.js";

const showReporting=async({render,session})=>{
    const userId = (await session.get('user')).id;
    const morning_reporting= await morningComplete(userId);
    const evening_reporting=await eveningComplete(userId);
    //console.log(morning_reporting,evening_reporting);
    // render ('reporting.ejs',{morning:morning_reporting,evening:evening_reporting});
    const ifLogin = await ifLanding(session);
    console.log("--------------", morning_reporting)
    console.log("--------------", evening_reporting)
    if (ifLogin) {  
        // await nowDate();
        // await trendLanding(session);
        // console.log(morning_data);
        render ("reporting.ejs", {morning:morning_reporting,evening:evening_reporting, ifLogin: ifLogin, email: average.email});
    } else {
        render('login.ejs',{errors:[]});
    }
}

export{showReporting};