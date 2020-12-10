import { superoak} from "../../deps.js";
import{app} from"../../app.js";

Deno.test({
    name: "GET to /",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});