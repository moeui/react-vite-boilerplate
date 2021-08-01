import produce from 'immer'

import { ILogin } from '../../services/baseServer/commonServer'
import { errorHandle } from '../../utils'

export enum DouYin {
    POST_LOGIN = 'POST_LOGIN'
}

export interface IDouYinState {
    loginInfo: ILogin
}

export const douYinState: IDouYinState = {
    loginInfo: {} as ILogin
}

export default {
    [DouYin.POST_LOGIN]: {
        next: produce((draft: IDouYinState, action: IAction) => {
            draft.loginInfo = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    }
}
