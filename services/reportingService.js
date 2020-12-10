const morning = async(session) => {
    if (await session.get('authenticated')) {
        //await session.set('id', 1);  // use a fixed id when reporting应该用在insert into 报告数据的时候
        return true;
    } else {
        return false;
    }
};

const evening = async(session) => {
    if (await session.get('authenticated')) {
        //await session.set('id', 1);
        return true;
    } else {
        return false;
    }
};

export { morning, evening };

