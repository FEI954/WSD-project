import { superoak} from "../../deps.js";
import{app} from"../../app.js";

Deno.test({
    name: "GET to /logout.",
    fn: async() => {
      const testClient = await superoak(app);
      const response = testClient.get('/logout');
      console.log(response.text);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});