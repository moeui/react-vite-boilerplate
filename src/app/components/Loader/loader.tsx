import { Spin } from 'antd'
import * as React from 'react'
import Loadable from 'react-loadable'

const Loading = (): JSX.Element => {
    return (
        <div className="lt-spin">
            <Spin size="large" tip="加载中..." />
        </div>
    )
}

export default (loader: Promise<any>): React.ComponentType & Loadable.LoadableComponent => {
    return Loadable({
        loader: () => loader,
        loading: Loading
    })
}
