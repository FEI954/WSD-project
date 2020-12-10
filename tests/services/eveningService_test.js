import { assertEquals } from "../../deps.js";
import { eveningComplete } from "../../services/eveningService.js";

Deno.test({
    name: "If today's evening reporting has been completed,return true",
    fn: async() => {
        assertEquals(await eveningComplete('1'),  true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
}); 

Deno.test({
    name: "If today's evening reporting has not been completed,return true",
    fn: async() => {
        assertEquals(await eveningComplete('2'),  false);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});