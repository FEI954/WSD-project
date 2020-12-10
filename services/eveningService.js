import { executeCachedQuery } from "../database/database.js";
//import { data } from "./userService.js";

const evening_data = {
    //dates: [],
    day: '',
    month: '',
    year: '',
    //sleepTimes: [], 
    sportTime: '',
    studyTime:'',
    //sleepQualities: [], 
    eatingQuality:'',
    genericMood: '',
    errors: [],
    eveningTrue:'',
    email: '',
    ifLogin: '',
};

/*const nowDate = async() =>{
    const now = await fetch('https://api.abalin.net/today?country=fi');//自动填充2020.1.1
    const obj = JSON.parse(await now.text());
    const month = obj.data.dates.month;
    const day = obj.data.dates.day;
    evening_data.year.push('2020')
    evening_data.month.push(month)
    evening_data.day.push(day)
}*/
const nowDate=async()=>{
    const myDate = new Date();
    const year=myDate.getFullYear();
    let month=myDate.getMonth()+1;
    let day=myDate.getDate();
    if((myDate.getMonth()+1)<10){    
        month="0"+month; 
    }
    if(myDate.getDate()<10){
        day="0"+day;
    }
    evening_data.year=year;
    evening_data.month=month;
    evening_data.day=day;
}

const eveningComplete = async(userId)=>{
    const myDate = new Date();
    const year = myDate.getFullYear();
    let month = myDate.getMonth()+1;
    let day = myDate.getDate();
    if((myDate.getMonth()+1)<10){    
        month="0"+month; 
    }
    if(myDate.getDate()<10){
        day="0"+day;
    }
    const date = `${year}--${month}--${day}`;
    const res = await executeCachedQuery("SELECT * FROM evenings WHERE date = $1 AND user_id=$2;", date,userId);
    if(res.length===0){
        return false;
    }else{
        return true;
    }
}

const validForm = async({session, date, sportTime, studyTime, eatingQuality,genericMood}) =>{
    const userId = (await session.get('user')).id;
    evening_data.errors = [];
    evening_data.sportTime='';
    evening_data.studyTime='';
    if (!sportTime){
        evening_data.errors.push('Time spent on sport and exercise must be entered.');
        evening_data.sportTime=sportTime;
        evening_data.sportTime=studyTime;
    }
    if (isNaN(sportTime)){
        evening_data.errors.push('Time spent on sport and exercise must be a number.');
        evening_data.sportTime=sportTime;
        evening_data.sportTime=studyTime;
    }
    if(Number(sportTime)&&Number(sportTime) < 0){
        evening_data.errors.push('Time spent on sport and exercise can not be negative.');
        evening_data.sportTime=sportTime;
        evening_data.sportTime=studyTime;
    }
    if (!studyTime){
        evening_data.errors.push('Time spent on studying must be entered.');
        evening_data.sportTime=studyTime;
        evening_data.sportTime=sportTime;
    }
    if (isNaN(studyTime)){
        evening_data.errors.push('Time spent on studying must be a number.');
        evening_data.studyTime=studyTime;
        evening_data.sportTime=sportTime;
    }
    if(Number(studyTime)&&Number(studyTime) < 0){
        evening_data.errors.push('Time spent on studying can not be negative.');
        evening_data.studyTime=studyTime;
        evening_data.sportTime=sportTime;
    }
    if (!eatingQuality){
        evening_data.errors.push('Please report regularity and quality of eating.');
        evening_data.studyTime=studyTime;
        evening_data.sportTime=sportTime;
    }
    if (!genericMood){
        evening_data.errors.push('Please report generic mood.');
        evening_data.studyTime=studyTime;
        evening_data.sportTime=sportTime;
    }
    if(evening_data.errors.length>0){
        return false;
    }else{
        // await executeCachedQuery("INSERT INTO evenings (date,sportTime,studyTime,eatingQuality,genericMood,user_id)VALUES($1,$2,$3,$4,$5,$6);",date,sportTime,studyTime,eatingQuality,genericMood,"1");
        // return true;
        evening_data.eveningTrue = await eveningComplete(userId);
        if(evening_data.eveningTrue = 'true'){
            const userId = (await session.get('user')).id;
            await executeCachedQuery("DELETE FROM evenings WHERE date = $1 AND user_id = $2;", date, userId);
            await executeCachedQuery("INSERT INTO evenings (date,sportTime,studyTime,eatingQuality,genericMood,user_id)VALUES($1,$2,$3,$4,$5,$6);",date,sportTime,studyTime,eatingQuality,genericMood,userId);
        }else{
            await executeCachedQuery("INSERT INTO evenings (date,sportTime,studyTime,eatingQuality,genericMood,user_id)VALUES($1,$2,$3,$4,$5,$6);",date,sportTime,studyTime,eatingQuality,genericMood,userId);
        }
        return true;
    }
}
    /*
    const ifSleepTime = await validSleepTime(sleepTime);
    // 这两种获取用户id的方式我不知道哪种可行；我先写死了id为1
    let id = await session.get('id');
    // const id = await executeQuery("SELECT id FROM user WHERE id =$1 AND user_id=$2;",id);
    if(ifSleepTime){
        await executeCachedQuery("INSERT INTO morning_report (id, date, sleepTime, sleepQuality, genericMood) VALUES ($1, $2, $3, $4, $5);", id, date, sleepTime, sleepQuality, genericMood);
        return true;
    }else{
        return false;
    }*/

export { nowDate, eveningComplete, validForm, evening_data};