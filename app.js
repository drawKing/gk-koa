import Koa from 'koa';
import koaBody from "koa-body";
import router from "./route";
import './controllers';

const app = new Koa();

app.use(koaBody(
    {multipart: true}
));
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('✨ 启动成功')
});
