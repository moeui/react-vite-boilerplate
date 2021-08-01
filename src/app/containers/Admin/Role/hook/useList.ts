import { message } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { useCallback, useEffect, useState } from 'react'

import { getRoleList, IAdminUserItem, IAdminUserList } from '../../../../services/adminServer/adminServer'

type Dispatch<A> = (form: A) => void
type Form = { page: number; pageSize: number; name?: string }

export type ColumnType = ColumnProps<IAdminUserItem>[]

export default function useList(): [boolean, IAdminUserList | undefined, Dispatch<{ page: number; pageSize: number; name?: string }>] {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IAdminUserList>()
    const [form, setForm] = useState<Form | undefined>()

    const getList = (form: Form, isForced?: boolean): void => {
        setForm(form)
    }

    useEffect(() => {
        if (!form?.page) return
        const load = async (): Promise<void> => {
            setLoading(true)
            const res = await getRoleList(form)
            const data = res.data
            if (data?.code === -1) {
                message.destroy()
                message.error(data?.msg)
            } else {
                setResponse(data)
            }
            setLoading(false)
        }
        load()
    }, [form])

    return [loading, response, getList]
}
