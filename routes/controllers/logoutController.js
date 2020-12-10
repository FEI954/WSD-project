const logout=async({response,session})=>{
    await session.set('authenticated',null);
    await session.set('user',null);
    response.redirect('/auth/login');
}

export{logout};