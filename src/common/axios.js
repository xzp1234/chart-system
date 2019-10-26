import axios from 'axios'
const root = 'http://localhost:8080/';
const axiosFn = function (method, url, param, succFn, errFn) {
    axios({
        method: method,
        url: url,
        params: method == 'get' ? param : null,
        data: method == 'post' ? param : null,
        baseURL: root,
        headers: {'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 1000,
        responseType: 'json'
    }).then(res => {
        succFn && succFn(res.data);
    }).catch(err => {
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(`请求状态码${error.response.status}`);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        errFn && errFn(err.response);
    });
};

const AxiosHttp = {
    get: (url, param, succFn, errFn) => axiosFn('get',url, param, succFn, errFn),
    post: (url, param, succFn, errFn) => axiosFn('post',url, param, succFn, errFn),
};

export default AxiosHttp;