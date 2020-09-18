import Koa from 'koa';
import koaBody from "koa-body";
import log4js from "log4js";
import errorHandler from './middlewares/errorHandlers';
import router from "./route";
import './controllers';

const app = new Koa();

// 错误日志记录
log4js.configure({
    appenders: {globalError: {type: "file", filename: "./logs/error.log"}},
    categories: {default: {appenders: ["globalError"], level: "error"}},
});

app.use(koaBody(
    {multipart: true}
));

// 容错处理
const logger = log4js.getLogger("cheese");
errorHandler.error(app, logger);

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('✨ 启动成功')
});
