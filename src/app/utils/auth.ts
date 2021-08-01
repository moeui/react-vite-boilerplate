import storage from '../utils/storage'

// console.log(storage.get('permissions'))

export default function authRender(component, isSuperman?: boolean): JSX.Element | Array<JSX.Element> {
    if (isSuperman) {
        return component
    }
    let arr: Array<JSX.Element> = []
    if (Array.isArray(component)) {
        component.forEach((c, i) => {
            if (c.key) {
                if (isAuth(c.key)) {
                    arr.push(c)
                }
            } else {
                console.error('authRender 传入的 component key 没有添加')
            }
        })
    } else {
        if (component.key) {
            if (isAuth(component.key)) {
                arr = component
            }
        } else {
            console.error('authRender 传入的 component key 没有添加')
        }
    }
    return arr
}

export function isAuth(key: string, isSuperman?: boolean): boolean {
    if (isSuperman) {
        return true
    }
    const list = storage.get('permissions') || []
    return list.indexOf(key) !== -1
}
