import { executeCachedQuery } from "../database/database.js";

const average = {
    //dates: [],
    averageToday:'',
    averageYesterday:'',
    trend:'',
    email:'',
};

const ifLanding = async(session) => {
    if (await session.get('authenticated')) {
        return true;
    } else {
        return false;
    }
};

const trendLanding = async(session) =>{
    const userId = (await session.get('user')).id;
    const myDate = new Date();
    const year = myDate.getFullYear();
    let month = myDate.getMonth()+1;
    let day = myDate.getDate();
    let dayYes = day - 1;
    if((myDate.getMonth()+1)<10){    
        month="0"+month; 
    }
    if(myDate.getDate()<10){
        day="0"+day;
        dayYes = "0" + dayYes;
    }
    // if(myDate.getDate()=10){
    //     dayYes = "0" + dayYes;
    // }
    const dateToday = `${year}--${month}--${day}`;
    const dateYesterday = `${year}--${month}--${dayYes}`;
    const averageTodayMorning = await executeCachedQuery("SELECT * FROM mornings WHERE date = $1 AND user_id = $2", dateToday, userId);
    const averageTodayEvening = await executeCachedQuery("SELECT * FROM evenings WHERE date = $1 AND user_id = $2", dateToday, userId);
    const averageYesMorning = await executeCachedQuery("SELECT * FROM mornings WHERE date = $1 AND user_id = $2", dateYesterday, userId);
    const averageYesEvening = await executeCachedQuery("SELECT * FROM evenings WHERE date = $1 AND user_id = $2", dateYesterday, userId);
    // console.log('averageTodayMorning', averageTodayMorning[0])
    // console.log('dateToday', dateToday)
    // console.log('dateYesterday', dateYesterday)
    // const a = averageTodayMorning[0];
    // const b = averageTodayMorning[0];
    // const c = averageTodayMorning[0];
    // const a = averageTodayMorning[0];
    // const mood = averageTodayMorning.rowsOfObjects()[0];
    // const generic_mood = mood.genericmood
    // console.log(generic_mood)
    // console.log("________________", averageTodayMorning);
    if(averageTodayMorning.length == 0 || averageTodayEvening.length == 0 || averageYesMorning.length == 0 || averageYesEvening.length == 0){
        average.trend = 'Dear, the data is not perfect enough, please fill in the form!';
        average.averageToday = 'NULL';
        average.averageYesterday = 'NULL';
        return;
    }
    const a = averageTodayMorning[0].genericmood;
    const b = averageTodayEvening[0].genericmood;
    const c = averageYesMorning[0].genericmood;
    const d = averageYesEvening[0].genericmood;
    // var averageTodayMorningJson = JSON.stringify(averageTodayMorning); 
    // var averageTodayEveningJson = JSON.stringify(averageTodayEvening); 
    // var averageYesMorningJson = JSON.stringify(averageYesMorning); 
    // var averageYesEveningJson = JSON.stringify(averageYesEvening); 
    average.averageToday = (a + b) / 2;
    average.averageYesterday = (c + d) / 2;
    // console.log("------------------", averageTodayMorningJson)
    // console.log("------------------", averageTodayMorningJson[0])
    // console.log("------------------", averageTodayMorningJson[0].genericMood)
    if(average.averageToday > average.averageYesterday){
        average.trend = 'things are looking bright today';
    }
    else if(average.averageToday < average.averageYesterday){
        average.trend = 'things are looking gloomy today';
    }else{
        average.trend = 'the same';
    }
}

export {ifLanding, average, trendLanding}