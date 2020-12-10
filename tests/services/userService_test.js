import { assertEquals } from "../../deps.js";
import { validateErrors,validateLogin,validRegistration } from "../../services/userService.js";


Deno.test({
    name: "Loging with '111@aalto.fi' as email and 'webweb' as password should return 'false'.",
    fn: async() => {
        assertEquals(await validateLogin('111@aalto.fi','webweb',[],[]),  false);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  }); //Cannot set property 'status' of undefined

Deno.test("Loging with '1@aalto.fi' as email and 'webweb' as password should return 'true'.", async() => {
    assertEquals(await validateLogin({email:'1@aalto.fi',password:'webweb',session:[],response:[]}),  true);
});//session.set is not a function
Deno.test("Loging with '1@aalto.fi' as email and 'webwe' as password should return 'false'.", async() => {
    assertEquals(await validateLogin({email:'1@aalto.fi',password:'webwe',session:[],response:[]}),  false);
});

Deno.test("Setting email as '1@aalto.fi', password as 'web' and verification as 'web' should return 'false'.", async() => {
    assertEquals(await validRegistration({email:'1@aalto.fi',password:'web',verification:'web'}),  false);
});
Deno.test("Setting email as '1@aalto.fi', password as 'webweb' and verification as 'webwe' should return '1'.", async() => {
    assertEquals(await validRegistration({email:'1@aalto.fi',password:'webweb',verification:'webwe'}),  1);
});
//Deno.test("Setting email as '1@aalto.fi', password as 'webweb' and verification as 'webweb' should return '2'.", async() => {
  //  assertEquals(await validRegistration({email:'1@aalto.fi',password:'webweb',verification:'webweb'}),  2);
//}); // Test case is leaking async ops.
Deno.test("Setting email as '1@aalto.fi', password as 'webweb' and verification as 'webweb' should return '2'.", async() => {
    assertEquals(await validRegistration({email:'1@aalto.fi',password:'webweb',verification:'webweb'}),  2);
});
Deno.test("Setting email as '0000@aalto.fi', password as 'webweb' and verification as 'webweb' should return 'true'.", async() => {
    assertEquals(await validRegistration({email:'0000@aalto.fi',password:'webweb',verification:'webweb'}),  true);
});

Deno.test("Setting email as '1@aalto.fi' and password as 'web' should return 'Password should at least 4 characters.'", async() => {
    assertEquals(await validateErrors({email:'1@aalto.fi',password:'web'}), ["Password should at least 4 characters."]);
});

Deno.test("Setting email as '1aalto.fi'and  password as 'webweb' should return 'Email should include @ and have at least 6 characters.'", async() => {
    assertEquals(await validateErrors({email:'1aalto.fi',password:'webweb'}), ["Email should include @ and have at least 6 characters."]);
});

Deno.test("Setting email as '1aalto.fi'and  password as 'web' should return 'Email should include @ and have at least 6 characters.assword should at least 4 characters.'", async() => {
    assertEquals(await validateErrors({email:'1aalto.fi',password:'web'}), ["Email should include @ and have at least 6 characters.","Password should at least 4 characters."]);
});

Deno.test("Setting email and password correctly should return ''", async() => {
    assertEquals(await validateErrors({email:'1@aalto.fi',password:'webweb'}), []);
});
