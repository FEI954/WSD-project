import{ifLanding, average, trendLanding} from "../../services/landingService.js";

const showLanding=async({render, session})=>{
    const ifLogin = await ifLanding(session);
    if (ifLogin) {  
        // await nowDate();
        await trendLanding(session);
        // console.log(morning_data);
        render ("landing.ejs", {averageToday: average.averageToday, averageYesterday: average.averageYesterday, ifLogin: ifLogin, email: average.email, trend: average.trend});
    } else {
        render('landing.ejs',{ifLogin: ifLogin});
    }
    // render ("landing.ejs");
}

export{showLanding};