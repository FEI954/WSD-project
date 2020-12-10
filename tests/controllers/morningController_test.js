import { superoak} from "../../deps.js";
import{app} from"../../app.js";

Deno.test({
    name: "GET to /behavior/reporting/morning.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/behavior/reporting/morning');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /behavior/reporting/morning.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.post('/behavior/reporting/morning')
                                .send();
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
