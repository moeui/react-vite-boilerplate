import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import basicAction from '../actions/baseAction'
import { ILogin } from '../services/baseServer/commonServer'
import storage from '../utils/storage'

type Dispatch<A> = (form: A) => void
type Form = { username: string; password: string }

export default function useLogin(): [boolean, ILogin | undefined, Dispatch<{ username: string; password: string }>] {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<ILogin>()
    const [form, setForm] = useState<Form | undefined>()

    const setLogin = useCallback(
        (form?: Form | undefined): void => {
            setForm(form)
        },
        [form]
    )

    useEffect(() => {
        if (form?.username && form?.password) {
            const load = async (): Promise<void> => {
                setLoading(true)
                const res = await dispatch(basicAction.login(form))
                const data: ILogin = (await res.payload)?.data
                if (data?.code === -1) {
                    message.destroy()
                    message.error(data?.msg)
                } else {
                    setResponse(data)
                    storage.set('authKey', data?.data)
                }
                setLoading(false)
                setLogin()
            }
            load()
        }
        return () => {}
    }, [form])

    return [loading, response, setLogin]
}
