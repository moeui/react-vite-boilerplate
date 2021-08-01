import baseServer from '../services/baseServer'

export const login2 = (params?: unknown) => ['base.login', params => baseServer.login(params)]

export const login3 = (params?) => ({
    key: 'base.login',
    fetcher: params => baseServer.login(params),
    initialData: { initialData: { x: 1 } }
})
