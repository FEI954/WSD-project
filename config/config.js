import {Pool} from "../deps.js";


const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({      // 还需要TEST_ENVIRONMENT吗？？
    hostname: "lallah.db.elephantsql.com",
    database: "snnzxvsp",
    user: "snnzxvsp",
    password: "7L5_gR73bxe_iy42cc2iq4U7_zSTBA6t",
    port: 5432  
}, CONCURRENT_CONNECTIONS);

export{connectionPool};


/*
let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hostname-possibly-at-elephantsql.com",
    database: "database-name",
    user: "user-name-typically-same-as-database-name",
    password: "password",
    port: 5432
  };
}

export { config };
*/