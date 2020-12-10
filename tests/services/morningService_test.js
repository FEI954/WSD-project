import { assertEquals } from "../../deps.js";
import { morningComplete } from "../../services/morningService.js";

Deno.test({
    name: "If today's morning reporting has been completed,return true",
    fn: async() => {
        assertEquals(await morningComplete('1'),  true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
}); 

Deno.test({
    name: "If today's morning reporting has not been completed,return true",
    fn: async() => {
        assertEquals(await morningComplete('2'),  false);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});