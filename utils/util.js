// 封装统一响应
const getResponseData = (data, errorMsg) => {
    const isHasError = errorMsg ? {errorMsg} : {};

    return {
        success: !errorMsg,
        ...isHasError,
        data,
    }
};

// 检测是否登陆
const checkLogin = (ctx, next) => {
    // TODO
    console.log('校验token等逻辑！');
    next();
};

export {
    getResponseData,
    checkLogin
}
