import { AxiosResponse } from 'axios'

import { request } from '../../utils/request'

export interface IGetAuthorSales {
    errCode: number
    errMsg: string
}

export type ILogin = IContent<string>

// 登录帐号
export function login(data): Promise<AxiosResponse<ILogin>> {
    return request('/login', {
        method: 'POST',
        data
    })
}

// 注册帐号
export function register(data): Promise<AxiosResponse<ILogin>> {
    return request(`/register`, {
        method: 'POST',
        data
    })
}
