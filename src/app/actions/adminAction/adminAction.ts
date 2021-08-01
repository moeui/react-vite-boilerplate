import { createAction } from 'redux-actions'

import { Admin } from '../../reducers/adminReducer/adminReducer'
import adminServer from '../../services/adminServer'

export const getUserList = data => createAction(Admin.USER_LIST, () => adminServer.getUserList(data))()
