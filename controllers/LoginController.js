import {prefix, get, post, use} from '../decorator';
import {checkLogin, getResponseData} from "../utils/util";
import mysql from '../db/mysql';

@prefix('/')
export class LoginController {
    @get('/')
    showIndex(ctx) {
        ctx.body = 'hello page'
    }

    @post('/login')
    async login(ctx) {
        // TODO
        const {username, password} = ctx.request.body;
        const result = await mysql.table('users').where(`username = '${username}' AND password = '${password}'`).select();

        ctx.body = 111;
    }

    @use([checkLogin]) // 可接收多个自定义中间件
    @get('/getData')
    getData(ctx) {
        ctx.body = getResponseData({
            list: [1, 2, 3]
        })
    }
}
