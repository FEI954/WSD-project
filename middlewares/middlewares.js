import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
  }  
  
  const requestInformationMiddleware = async({ request,session }, next) => {
    //const start = Date.now();
    await next();
    //const ms = Date.now() - start;
    let user='anonymous';
    if(session&&session.get('authenticated')){
        user=session.get('user').id;
    }
    console.log(`${Date.now()} ${request.method} ${request.url.pathname} ${user}`);
  }

  const controlAccessMiddleware=async({request, response, session}, next) => {
    if(request.url.pathname.startsWith('/auth') || request.url.pathname === '/'){
      await next();
    }else{
        if (session && await session.get('authenticated')) {
          await next();
        } else {
          response.redirect('/auth/login');
        }
      }
}
  
  const serveStaticFilesMiddleware = async(context, next) => {
    if (context.request.url.pathname.startsWith('/static')) {
      const path = context.request.url.pathname.substring(7);
    
      await send(context, path, {
        root: `${Deno.cwd()}/static`
      });
    
    } else {
      await next();
    }
  }


  
  export { errorMiddleware, requestInformationMiddleware, controlAccessMiddleware,serveStaticFilesMiddleware };