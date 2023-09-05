import {create} from 'apisauce';

const request = create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export class Request {

    static async get(url, params, headers) {
        return await request.get(url, params, {headers: headers});
    };

    static async post(url, params, headers) {
        return await request.post(url, params, {headers: headers});
    };
}