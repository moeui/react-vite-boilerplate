import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import NotFound from '../containers/NotFound'
import systemRouter from './systemRouter'

const Loading = (): JSX.Element => {
    return (
        <div className="lt-spin">
            <Spin size="large" tip="加载中..." />
        </div>
    )
}

export default (): JSX.Element => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {systemRouter.map((r, key) => {
                    return <Route exact={!!r.exact} render={() => <r.component key={r.router + key} />} key={r.router + key} path={r.router} />
                })}
                <Route exact={true} path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Suspense>
    )
}
