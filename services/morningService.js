import { executeCachedQuery } from "../database/database.js";
//import { data } from "./userService.js";

const morning_data = {
    //dates: [],
    day: '',   //day:[],
    month: '',
    year: '',
    //sleepTimes: [], 
    sleepDuration: '',
    sleepQuality: '',
    //sleepQualities: [], 
    genericMood: '',
    errors: [],
    morningTrue:''
};

/*const nowDate = async() =>{
    const now = await fetch('https://api.abalin.net/today?country=fi');//自动填充2020.1.1
    const obj = JSON.parse(await now.text());
    const month = obj.data.dates.month;
    const day = obj.data.dates.day;
    morning_data.year.push('2020');  //morning.data.year 是列表
    morning_data.month.push(month);
    morning_data.day.push(day);
}这个function可行！*/
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
    morning_data.year=year;
    morning_data.month=month;
    morning_data.day=day;
}

const morningComplete = async(userId)=>{
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
    //const userId = (await session.get('user')).id;
    const res = await executeCachedQuery("SELECT * FROM mornings WHERE date = $1 AND user_id=$2;", date,userId);
    // if (res.length===0) {   //为什么 不能用res.rowcount ??res是个列表？？
    //     //console.log('1');
    //     morningTrue = false;
    // }else{
    //     morningTrue = true;
    // }
    if (res.length === 0){
        //morning_data.morningTrue = 'false';
        return false;
    }else{
        return true;
        //morning_data.morningTrue = 'true';
    }
}
/*
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //****获取当前月份(0-11,0代表1月)******
myDate.getDate();        //获取当前日(1-31)
*/

/*const validSleepTime = async(sleepTime) =>{
    // if (!sleepTime || Number(sleepTime).toString() !== sleepTime) {
    //     response.body = 'Invalid SleepTime';
    //     return;
    // } 
    data.errors = [];
    if (isNaN(sleepTime)){
        data.errors.push('Invalid time');
        return false;
    }else{
        if(Number(sleepTime) > 0){
            return true;
        }else{
            return false;  
        }
    }
}*/

const validForm = async({session, date, sleepDuration, sleepQuality, genericMood}) =>{
    const userId = (await session.get('user')).id;
    morning_data.errors = [];
    morning_data.sleepDuration='';
    if (!sleepDuration){
        morning_data.errors.push('Sleep duration must be entered.');
        morning_data.sleepDuration=sleepDuration;
        //document.querySelector("#day").innerHTLM='';
    }
    if (isNaN(sleepDuration)){
        morning_data.errors.push('Sleep duration must be a number.');
        morning_data.sleepDuration=sleepDuration;
        //document.querySelector("#day").innerHTLM=`${sleepDuration}`;
    }

    if(Number(sleepDuration) && Number(sleepDuration)< 0){
        morning_data.errors.push('Sleep duration can not be negative.');
        morning_data.sleepDuration=sleepDuration;
        morning_data.sleepQuality=sleepQuality;
        morning_data.genericMood=genericMood;
        //morning_data.sleepDuration=sleepDuration; 填充不了，不如就做成文本输入框吧呜呜呜
    }
    if (!sleepQuality){
        morning_data.errors.push('Please report sleep quality.');
        morning_data.sleepDuration=sleepDuration;
        morning_data.sleepQuality=sleepQuality;
        morning_data.genericMood=genericMood;
    }
    if (!genericMood){
        morning_data.errors.push('Please report generic mood.');
        morning_data.sleepDuration=sleepDuration;
        morning_data.sleepQuality=sleepQuality;
        morning_data.genericMood=genericMood;
    }
    
    if(morning_data.errors.length>0){
        morning_data.sleepDuration = sleepDuration;
        morning_data.sleepQuality = sleepQuality;
        morning_data.genericMood = genericMood;
        return false;
    }else{
        // const res = await executeCachedQuery("SELECT * FROM mornings WHERE date = $1;", date);
        morning_data.morningTrue=await morningComplete(userId);
        if(morning_data.morningTrue = 'true'){
            //const userId = (await session.get('user')).id;
            await executeCachedQuery("DELETE FROM mornings WHERE date = $1 AND user_id = $2;", date, userId);
            await executeCachedQuery("INSERT INTO mornings (date,sleepDuration,sleepQuality,genericMood,user_id)VALUES($1,$2,$3,$4,$5);",date,sleepDuration,sleepQuality,genericMood,userId);
        }else{
            await executeCachedQuery("INSERT INTO mornings (date,sleepDuration,sleepQuality,genericMood,user_id)VALUES($1,$2,$3,$4,$5);",date,sleepDuration,sleepQuality,genericMood,userId);
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

export { nowDate, morningComplete, validForm, morning_data};