import mysql from '../db/mysql';

export default class LoginModel {
    async login(ctx) {
        const {username, password} = ctx.request.body;

        console.log(username, password);

        return await mysql.table('users').where(`username = '${username}' AND password = '${password}'`).select();
    }
}
