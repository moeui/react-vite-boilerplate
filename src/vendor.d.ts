declare namespace NodeJS {
    export interface Global {
        app: any
        handle: any
        scatter: any
    }
}

declare module '*.json' {
    const content: any
    export default content
}

interface Window {
    wx: any
}

interface IContent<T> {
    msg: string
    code: number
    data: T
}

interface IList<T> {
    page: number
    pageSize: number
    total: number
    list: T
}

interface IAction {
    payload: IContent<any>
    error?: boolean
}

interface IGetList {
    search?: string
    per_page?: number
    page?: number
}
