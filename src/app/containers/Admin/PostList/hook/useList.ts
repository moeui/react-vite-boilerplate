import { message } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { useCallback, useEffect, useState } from 'react'

import { getPostList, IPostItem, IPostList } from '../../../../services/adminServer/adminServer'

type Dispatch<A> = (form: A) => void
type Form = { page: number; pageSize: number; title?: string; lng: string }

export type ColumnType = ColumnProps<IPostItem>[]

export default function useList(): [boolean, IPostList | undefined, Dispatch<{ page: number; pageSize: number; title?: string; lng: string }>] {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IPostList>()
    const [form, setForm] = useState<Form | undefined>()

    const getList = (form: Form): void => {
        setForm(form)
    }

    useEffect(() => {
        if (!form?.page) return
        const load = async (): Promise<void> => {
            setLoading(true)
            const res = await getPostList(form)
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
