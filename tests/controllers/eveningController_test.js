import { superoak} from "../../deps.js";
import{app} from"../../app.js";

Deno.test({
    name: "GET to /behavior/reporting/evening.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/behavior/reporting/evening');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /behavior/reporting/evening.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.post('/behavior/reporting/evening')
                                .send();
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});