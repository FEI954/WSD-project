import { bcrypt } from "../deps.js";
import {executeCachedQuery}from"../database/database.js";


const data = {
    password: '',
    passwords: [],
    email:'',
    emails:[],
    errors: []
};

const validateErrors = async({email, password}) => {
    data.errors = [];
    if (!email || !email.includes('@') || email.length < 6) {
        data.errors.push("Email should include @ and have at least 6 characters.");
    }
    if (!password || password.length < 4) {
        data.errors.push("Password should at least 4 characters.");
    }
  
    return data.errors;
}

const validateLogin = async({email, password ,session,response}) => {
    data.errors = [];
    const res = await executeCachedQuery("SELECT * FROM users WHERE email = $1;", email);
    //console.log(res);
    if (res.length===0) {   //为什么 不能用res.rowcount ??res是个列表？？
        //console.log('1');
        data.errors.push("Invalid email or password.");
        response.status = 401;
        return false;
    }
    // take the first row from the results
    //console.log(res);
    //const userObj = res.rowsOfObjects()[0];为什么不能用rowsofobjects()？
    //res输出格式是[{id:1,email:1@aalto.fi,password:ndffndjkvbdlf},{},{},{}]
    const userObj = res[0];   
    //console.log(userObj);
    const hash = userObj.password;
  
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        data.errors.push("Invalid email or password");
        response.status = 401;
        return false;
    }

    if(data.errors.length>0){
        return false;
    }
  
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
    return true;
}


const validRegistration = async({email, password, verification}) => {
    
    data.errors = [];
    data.email = '';
    
    if (password !== verification) {
      //data.errors.push("Password and verification code are inconsistent ");
      //data.email = email;
      //render("register_input_again.ejs",{value});
      let value=1;
      return value;
    }
    //user register 
    if (!email || !email.includes('@') || email.length < 6) {
        data.errors.push("Email should include @ and have at least 6 characters.");
        data.email = email;
    }
    if (!password || password.length < 4) {
        data.errors.push("password should at least 4 characters.");
        data.email = email;
        //
    }

    if (data.errors.length>0){
        return false;
    }
    const existingUsers = await executeCachedQuery("SELECT * FROM users WHERE email = $1", email);
    if (existingUsers.length> 0) {
        let value2 = 2;
      //response.body = 'The email is already reserved.';
      //data.email = email;
      //render("register_input_again.ejs",{value});
        let value=1;
        return value2;
    }
    // check that a user don't exist
  
    const hash = await bcrypt.hash(password);
    await executeCachedQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    //response.body = 'Registration successful!';
    return true;
    // add the new user to the database
};

export { validateLogin, validateErrors, validRegistration, data};