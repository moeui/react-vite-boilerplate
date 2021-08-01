import { AxiosResponse } from 'axios'

import { request } from '../../utils/request'

export type IAdminUserItem = { id: number; username: string }
export type IAdminUserList = IContent<IList<IAdminUserItem[]>>

export function getUserList(data): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/user`, {
        method: 'GET',
        params: {
            ...data
        }
    })
}

export function getUser(id): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/user/${id}`, {
        method: 'GET'
    })
}

export function postUser(data): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/user/`, {
        method: 'POST',
        data
    })
}

export function putUser(id, data): Promise<AxiosResponse> {
    return request(`/user/${id}`, {
        method: 'PUT',
        data
    })
}

export function delUser(id): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/user/${id}`, {
        method: 'DELETE'
    })
}

export function getRoleList(data): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/role`, {
        method: 'GET',
        params: {
            ...data
        }
    })
}

export function getRole(id): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/role/${id}`, {
        method: 'GET'
    })
}

export function postRole(data): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/role/`, {
        method: 'POST',
        data
    })
}

export function putRole(id, data): Promise<AxiosResponse> {
    return request(`/role/${id}`, {
        method: 'PUT',
        data
    })
}

export function delRole(id): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/role/${id}`, {
        method: 'DELETE'
    })
}
