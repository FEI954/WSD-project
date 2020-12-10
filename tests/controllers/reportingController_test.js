import { superoak} from "../../deps.js";
import{app} from"../../app.js";

Deno.test({
    name: "GET to /behavior/reporting.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/behavior/reporting');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
