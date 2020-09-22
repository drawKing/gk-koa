import {prefix, get, post, use} from '../decorator';
import {checkLogin, getResponseData} from "../utils/util";
import LoginModel from "../models/LoginModel";

const loginModel = new LoginModel();

@prefix('/')
export class LoginController {
    @get('/')
    async showIndex(ctx) {
        ctx.body = 'hello page';
    }

    @post('/login')
    async login(ctx) {
        const res = await loginModel.login(ctx);

        ctx.body = getResponseData(!!res.length); // res.length > 0 代表查到此用户
    }

    @use([checkLogin]) // 可接收多个自定义中间件
    @get('/getData')
    getData(ctx) {
        ctx.body = getResponseData({
            list: [1, 2, 3]
        })
    }
}
