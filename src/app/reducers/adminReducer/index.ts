import { handleActions } from 'redux-actions'

import baseReducer, { douYinState, IDouYinState } from './adminReducer'

const initialState = {
    ...douYinState
}

export type IBase = IDouYinState

export default handleActions(
    {
        ...baseReducer
    },
    initialState
)
