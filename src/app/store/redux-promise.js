/**
 * 代替 redux-promise，原先redux-promise 在 webpack5 打包时，lodash 没有按需
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import isPromise from 'is-promise'
import { isPlainObject, isString } from 'lodash'

function isFSA(action) {
    return isPlainObject(action) && isString(action.type) && Object.keys(action).every(isValidKey)
}

function isValidKey(key) {
    return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1
}

export default function promiseMiddleware({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : next(action)
        }

        return isPromise(action.payload)
            ? action.payload
                  .then(result => dispatch({ ...action, payload: result }))
                  .catch(error => {
                      dispatch({ ...action, payload: error, error: true })
                      return Promise.reject(error)
                  })
            : next(action)
    }
}
