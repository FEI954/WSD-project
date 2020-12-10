import {executeCachedQuery}from"../database/database.js";

const monthly_data = {
    weekly:'',
    monthly:'',
    sleepDuration_average:'',
    sportTime_average:'',
    studyTime_average: '',
    sleepQuality_average:'',
    genericMood_average:'',
    ifLogin: '',
    email: '',
    month:'',
    year:'',
};

const ifLogin = async(session) => {
    if (await session.get('authenticated')) {
        return true;
    } else {
        return false;
    }
};

const getAverageMonth = async(session) => {
    const userId = (await session.get('user')).id;
    const email = (await session.get('user')).email;
    monthly_data.email=email;
    const myDate = new Date();
    const year = myDate.getFullYear();
    let month = myDate.getMonth()+1;
    let day = myDate.getDate();
    console.log("+++++++++++", month)
    if (month === '1'){
        let startyear = year - 1;
        let startmonth = '12';
        let startday = "01";
        var startdate = `${startyear}--${startmonth}--${startday}`;
        let endyear = year - 1;
        let endmonth = '12';
        let endday = "30";
        var enddate = `${endyear}--${endmonth}--${endday}`;
    }else{
        let startyear = year;
        let startmonth = month - 1;
        if (startmonth<10){
            startmonth = "0" + startmonth;
        }
        let startday = "01";
        var startdate = `${startyear}--${startmonth}--${startday}`;
        let endyear = year;
        let endmonth = month - 1;
        if (endmonth<10){
            endmonth = "0" + endmonth;
        }
        let endday = "30";
        var enddate = `${endyear}--${endmonth}--${endday}`;
        console.log("+++++++++++", enddate)
    }

    const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    // console.log(res_eve,res_mor);
    // console.log(res_eve[0],res_mor[0]);
    monthly_data.sportTime_average=Number(res_eve[0].sporttime_average);
    monthly_data.sportTime_average=monthly_data.sportTime_average.toFixed(2);
    console.log("+++++++++++++++++++++++++++", monthly_data.sportTime_average);
    monthly_data.studyTime_average=Number(res_eve[0].studytime_average);
    monthly_data.studyTime_average=monthly_data.studyTime_average.toFixed(2);
    monthly_data.sleepDuration_average=Number(res_mor[0].sleepduration_average);
    monthly_data.sleepDuration_average=monthly_data.sleepDuration_average.toFixed(2);
    monthly_data.sleepQuality_average=Number(res_mor[0].sleepquality_average);
    monthly_data.sleepQuality_average=monthly_data.sleepQuality_average.toFixed(2);
    monthly_data.genericMood_average=(Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
    // console.log("--------------", monthly_data.genericMood_average);
    return;
}

const searchAverageMonth = async({session, month, year}) => {
    const userId = (await session.get('user')).id;
    var startdate = `${year}--${month}--01`;
    var enddate = `${year}--${month}--30`;
    const res_eve = await executeCachedQuery("SELECT AVG(sportTime) AS sportTime_average, AVG(studyTime) AS studyTime_average, AVG(genericMood) AS genericMood_average FROM evenings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    const res_mor = await executeCachedQuery("SELECT AVG(sleepDuration) AS sleepDuration_average, AVG(sleepQuality) AS sleepQuality_average, AVG(genericMood) AS genericMood_average FROM mornings WHERE date >= $1 AND date <= $2 AND user_id = $3", startdate, enddate, userId);
    monthly_data.sportTime_average=Number(res_eve[0].sporttime_average);
    monthly_data.sportTime_average=monthly_data.sportTime_average.toFixed(2);
    //console.log(weekly_data.sportTime_average);
    monthly_data.studyTime_average=Number(res_eve[0].studytime_average);
    monthly_data.studyTime_average=monthly_data.studyTime_average.toFixed(2);
    monthly_data.sleepDuration_average=Number(res_mor[0].sleepduration_average);
    monthly_data.sleepDuration_average=monthly_data.sleepDuration_average.toFixed(2);
    monthly_data.sleepQuality_average=Number(res_mor[0].sleepquality_average);
    monthly_data.sleepQuality_average=monthly_data.sleepQuality_average.toFixed(2);
    monthly_data.genericMood_average=(Number(res_eve[0].genericmood_average)+Number(res_mor[0].genericmood_average))/2;
    //console.log("--------------", res);
    return;
}

export { ifLogin, getAverageMonth, monthly_data, searchAverageMonth};