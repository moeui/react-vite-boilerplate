import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import './app/utils/i18n'
import 'virtual:svg-icons-register'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import GlobalProvider from './app/context/global'
import AppRouter from './app/router'
import store, { history } from './app/store'

render(
    <ConfigProvider locale={zhCN}>
        <GlobalProvider>
            <Provider store={store}>
                <Router history={history}>
                    <AppRouter />
                </Router>
            </Provider>
        </GlobalProvider>
    </ConfigProvider>,
    document.getElementById('root')
)
