import 'reflect-metadata';
import router from "../route";

const Methods = {
    get: 'get',
    post: 'post',
};

// 包装接口真实路径，及用到的中间件
function prefix(prefix) {
    return function (target) {
        const proto = Object.getOwnPropertyNames(target.prototype); // 返回所有自身上的属性名 [ 'constructor', 'showIndex', 'login', 'getData' ]

        for (let key of proto) {
            const path = Reflect.getMetadata('path', target.prototype, key);
            const method = Reflect.getMetadata('method', target.prototype, key);
            const middleware = Reflect.getMetadata('middleware', target.prototype, key);
            const handler = target.prototype[key]; // 传给 router 的回调函数

            if (path && method) {
                const fullPath = prefix === '/' ? path : `${prefix}${path}`;

                if (middleware) {
                    router[method](fullPath, ...middleware, handler);
                } else {
                    router[method](fullPath, handler);
                }
            }
        }
    }
}

function request(type) {
    return function (path) {
        return function (target, key) {
            // console.log(target, 'target'); // 具体到某个controller: LoginController
            // console.log(key, 'key'); // 具体方法名: getData
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

// 自定义中间件
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}

const get = request(Methods.get);
const post = request(Methods.post);

export {
    prefix,
    get,
    post,
    use
}
