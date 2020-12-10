
import { connectionPool } from "../config/config.js";

/*
const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({
    hostname: "john.db.elephantsql.com",
    database: "zuhiohvv",
    user: "zuhiohvv",
    password: "RAXi_X8yOcyOSvaqhrNmIihBsJFXmKMM",
    port: 5432  
}, CONCURRENT_CONNECTIONS);
*/ 

let cache = {};

const executeQuery = async(query, ...params) => {
  const client = await connectionPool.connect();
  try {
      const res = await client.query(query, ...params);
      return res.rowsOfObjects();
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return [];
};

const executeCachedQuery = async(query, ...params) => { //需不需要caching query  ？因为有缺陷、
    const key = query + params.reduce((acc, o) => acc + "-" + o, "");
    if (cache[key]) {
        return cache[key];
    }

    const res = await executeQuery(query, ...params);
    cache[key] = res;
    /*
    if (query.startsWith('INSERT')){
        cache[key]='';
    }
    */
    return res;
}

export {executeCachedQuery};