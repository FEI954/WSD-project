import { superoak} from "../../deps.js";
//import { showRegistrationForm, showLoginForm, submitLogin, submitRegister } from"../../routes/controllers/userController.js";
import{app} from"../../app.js";


Deno.test({
    name: "GET to /auth/registration.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/auth/registration.');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /auth/login.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/auth/login');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /auth/registration.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.post('/auth/registration')
                                  .send("email=1@aalto.fi&password=webweb&verification=webweb")
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
Deno.test({
    name: "POST to /auth/login.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.post('/auth/registration')
                                  .send("email=1@aalto.fi&password=webweb")
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});



