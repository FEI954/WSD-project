import { Router } from "../deps.js";
import * as userController from "./controllers/userController.js";
import * as userApi from "./apis/userApi.js";
import * as reportingController from "./controllers/reportingController.js";
import * as morningController from "./controllers/morningController.js";
import * as eveningController from "./controllers/eveningController.js";
import * as weeklyController from "./controllers/weeklyController.js";
import * as monthlyController from "./controllers/monthlyController.js";
import * as summaryController from "./controllers/summaryController.js";
import {logout} from "./controllers/logoutController.js";
import{showLanding} from"./controllers/landingController.js";


const router = new Router();

router.get('/auth/login', userController.showLoginForm);
router.post('/auth/login', userController.submitLogin);
router.get('/auth/registration', userController.showRegistrationForm);
router.post('/auth/registration', userController.submitRegister);

//需要修改？
//router.post('/behavior/reporting', reportingController.morningLogin);
//router.post('/behavior/reporting', reportingController.eveningLogin);
//
router.get('/behavior/reporting',reportingController.showReporting);
router.get('/behavior/reporting/morning', morningController.showMorningForm);
router.get('/behavior/reporting/evening', eveningController.showEveningForm);
router.get('/logout',logout);
router.post('/behavior/reporting/morning', morningController.submitMorningForm);
router.post('/behavior/reporting/evening',eveningController.submitEveningForm);
router.get('/',showLanding)


router.get('/behavior/summary', summaryController.showSummary);
router.post('/behavior/summary', summaryController.subSummary);

// 这两个路由找不到 很奇怪, 啊好像能调通了
router.get('/behavior/summary/weekly', weeklyController.showWeekly);
router.post('/behavior/summary/weekly', weeklyController.submitWeekly);
router.get('/behavior/summary/monthly', monthlyController.showMonthly);
router.post('/behavior/summary/monthly', monthlyController.submitMonthly);

router.get('/api/summary/:year/:month/:day', userApi.specialDay);
router.get('/api/summary', userApi.sevenSummary);


export{router};