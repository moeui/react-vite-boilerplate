import produce from 'immer'

import { ILogin } from '../../services/baseServer/commonServer'
import { errorHandle } from '../../utils'

export enum Admin {
    USER_LIST = 'USER_LIST'
}

export interface IAdminState {
    loginInfo: ILogin
}

export const douYinState: IAdminState = {
    loginInfo: {} as ILogin
}

export default {
    [Admin.USER_LIST]: {
        next: produce((draft: IAdminState, action: IAction) => {
            draft.loginInfo = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    }
}
