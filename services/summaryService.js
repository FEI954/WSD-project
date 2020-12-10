import {executeCachedQuery}from"../database/database.js";

const data = {
    Weekly: '',
    Monthly: '',
    sleepDuration:'',
    sportTime:'',
    studyTime: '',
    sleepQuality:'',
    genericMood:'',
};

const ifLogin = async(session) => {
    if (await session.get('authenticated')) {
        //await session.set('id', 1);  // use a fixed id when reporting应该用在insert into 报告数据的时候
        return true;
    } else {
        return false;
    }
};

const submitSummary = async(frequency) => {
    if( frequency === "Weekly"){
        data.Weekly = 'true';
    }
    if( frequency === "Monthly"){
        data.Monthly = 'true';
    }
}



export { ifLogin, submitSummary, data};