import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { ILogin, register } from '../services/baseServer/commonServer'
import storage from '../utils/storage'

type Dispatch<A> = (form: A) => void
type Form = { username: string; password: string }

export default function useRegister(): [boolean, ILogin | undefined, Dispatch<{ username: string; password: string }>] {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<ILogin>()
    const [form, setForm] = useState<Form | undefined>()

    const setRegister = useCallback(
        (form?: Form | undefined): void => {
            setForm(form)
        },
        [form]
    )

    useEffect(() => {
        if (form?.username && form?.password) {
            const load = async (): Promise<void> => {
                setLoading(true)
                const res = await register(form)
                const data = res.data
                if (data?.code === -1) {
                    message.destroy()
                    message.error(data?.msg)
                } else {
                    setResponse(data)
                    storage.set('authKey', data?.data)
                }
                setLoading(false)
                setRegister()
            }
            load()
        }
    }, [form])

    return [loading, response, setRegister]
}
