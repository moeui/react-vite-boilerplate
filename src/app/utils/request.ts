import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { baseService } from './config'
import storage from './storage'

axios.defaults.baseURL = baseService
axios.defaults.withCredentials = false

function checkStatus(response: AxiosResponse): AxiosResponse {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    throw error
}

export async function request(reqUrl: string, options: AxiosRequestConfig = { method: 'GET' }): Promise<AxiosResponse> {
    if (!/login|register/.test(reqUrl)) {
        axios.defaults.headers.common['Authorization'] = storage.get('token') ? storage.get('token') : ''
    }
    const response = await axios(reqUrl, options)
        .then(checkStatus)
        .catch(err => {
            throw err
        })
    return response
}
