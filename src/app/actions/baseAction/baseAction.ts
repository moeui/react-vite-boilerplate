import { createAction } from 'redux-actions'

import { DouYin } from '../../reducers/baseReducer/baseReducer'
import baseServer from '../../services/baseServer'

export const login = data => createAction(DouYin.POST_LOGIN, () => baseServer.login(data))()
export const getAuthorSales = data => createAction(DouYin.GET_AUTHOR_SALES, () => baseServer.getAuthorSales(data))()
