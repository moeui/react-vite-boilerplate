import React, { createContext, useState } from 'react'

import EventEmitter from '../utils/event'

interface IProps {
    children?: JSX.Element[] | JSX.Element
}

interface IContext {
    count: number
    setCount: (number: number) => void
    onChangeCount: () => void
}

export const GlobalContext = createContext({} as IContext)

export default ({ children }: IProps): JSX.Element => {
    const [count, setCount] = useState(0)

    EventEmitter.on('setCount', setCount)

    const onChangeCount = (): void => {
        // 模拟请求，两秒后修改值
        setTimeout(() => {
            setCount(2000)
        }, 2000)
    }

    return (
        <GlobalContext.Provider
            value={{
                count,
                setCount,
                onChangeCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
