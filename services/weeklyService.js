import {executeCachedQuery}from"../database/database.js";

const weekly_data = {
    weekly:'',
    monthly:'',
    sleepDuration_average:'',
    sportTime_average:'',
    studyTime_average: '',
    sleepQuality_average:'',
    genericMood_average:'',
    ifLogin: '',
    email: '',
    dayFrom:'',
    monthFrom:'',
    yearFrom:'',
    dayTo:'',
    monthTo:'',
    yearTo:'',

};

const ifLogin = async(session) => {
    if (await session.get('authenticated')) {
        return true;
    } else {
        return false;
    }
};

const getAverage = async(session) => {
    const userId = (await session.get('user')).id;
    const email = (await session.get('user')).email;
    weekly_data.email=email;
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
    const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    //console.log(res_eve,res_mor);
    //console.log(res_eve[0],res_mor[0]);
    weekly_data.sportTime_average=Number(res_eve[0].sporttime_average);
    weekly_data.sportTime_average=weekly_data.sportTime_average.toFixed(2);
    //console.log(weekly_data.sportTime_average);
    weekly_data.studyTime_average=Number(res_eve[0].studytime_average);
    weekly_data.studyTime_average=weekly_data.studyTime_average.toFixed(2);
    weekly_data.sleepDuration_average=Number(res_mor[0].sleepduration_average);
    weekly_data.sleepDuration_average=weekly_data.sleepDuration_average.toFixed(2);
    weekly_data.sleepQuality_average=Number(res_mor[0].sleepquality_average);
    weekly_data.sleepQuality_average=weekly_data.sleepQuality_average.toFixed(2);
    weekly_data.genericMood_average=(Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
    //console.log("--------------", res);
    return;
}

const searchAverage = async({session, dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo}) => {
    const userId = (await session.get('user')).id;
    var startdate = `${yearFrom}--${monthFrom}--${dayFrom}`;
    var enddate = `${yearTo}--${monthTo}--${dayTo}`;
    const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    weekly_data.sportTime_average=Number(res_eve[0].sporttime_average);
    weekly_data.sportTime_average=weekly_data.sportTime_average.toFixed(2);
    //console.log(weekly_data.sportTime_average);
    weekly_data.studyTime_average=Number(res_eve[0].studytime_average);
    weekly_data.studyTime_average=weekly_data.studyTime_average.toFixed(2);
    weekly_data.sleepDuration_average=Number(res_mor[0].sleepduration_average);
    weekly_data.sleepDuration_average=weekly_data.sleepDuration_average.toFixed(2);
    weekly_data.sleepQuality_average=Number(res_mor[0].sleepquality_average);
    weekly_data.sleepQuality_average=weekly_data.sleepQuality_average.toFixed(2);
    weekly_data.genericMood_average=(Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
    //console.log("--------------", res);
    return;
}

export { ifLogin, getAverage,weekly_data, searchAverage};
