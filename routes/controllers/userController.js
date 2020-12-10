
import{ifLanding, average, trendLanding} from "../../services/landingService.js";
import { validateLogin, validateErrors, validRegistration, data } from "../../services/userService.js";
import {morningComplete} from"../../services/morningService.js";
import {eveningComplete} from"../../services/eveningService.js";

const showRegistrationForm = ({render}) => {
  render('register.ejs',{email:'',errors:[]});
}

const showLoginForm = ({render}) => {
  // const errors = [];
  render('login.ejs',{errors:[]});
} 

const submitLogin = async ({request, render, session,response}) => {
  const body = request.body();  //destructuring之后，不用加{type:'json}
  const document = await body.value;
  const email = document.get('email');   //=docuemnt.email;
  const password = document.get('password');
  const errors =await validateErrors({email, password});
  const valid = await validateLogin({email, password, session,response});
  average.email = email;

  if (errors.length > 0) {
    render("login.ejs", { errors: data.errors});
  } else {
    if(valid === true){
      // login is ok! 需要再写reporting的数据
      const userId = (await session.get('user')).id;
      // const morning_reporting= await morningComplete(userId);
      // const evening_reporting=await eveningComplete(userId);
      // render("reporting.ejs",{morning:morning_reporting,evening:evening_reporting});
      await trendLanding(session);
      const ifLogin = ifLanding(session);
      render("landing.ejs", {averageToday: average.averageToday, averageYesterday: average.averageYesterday, ifLogin: ifLogin, email: average.email, trend: average.trend});
    }else{
      render("login.ejs", { errors: data.errors} );
    }
  }
};


const submitRegister = async ({request, render}) => {
  const body = request.body();
  const params = await body.value;
    
  const email = params.get('email');
  const password = params.get('password');
  const verification = params.get('verification');

  const valid = await validRegistration({email, password, verification,render});

  if (valid === true) {
    render("successful_registration.ejs");
    //render("login.ejs",{errors:[]}); 
  } else {
      if (valid===1|| valid===2){
        render("register_input_again.ejs",{value:valid});
      }else{
        render("register.ejs",{ errors: data.errors, email: data.email});
      }
    }
};


export { showRegistrationForm, showLoginForm, submitLogin, submitRegister };
