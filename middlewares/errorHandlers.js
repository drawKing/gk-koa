// 错误处理
export default class ErrorHandlers {
    static error(app, logger) {
        // 全局错误 catch
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (e) {
                // 错误日志记录
                logger.error(e);
                ctx.body = "500 请求，正在积极修复";
            }
        });

        // 处理页面的 404 401 等
        app.use(async (ctx, next) => {
            await next();
            if (ctx.status === 404) {
                // 公益 404
                ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
            }
        });
    }
}

