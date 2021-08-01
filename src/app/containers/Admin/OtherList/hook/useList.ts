import { message } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { useCallback, useEffect, useState } from 'react'

import { getOtherList, IOtherItem, IOtherList } from '../../../../services/adminServer/adminServer'

type Dispatch = () => void
export type ColumnType = ColumnProps<IOtherItem>[]

export default function useList(): [boolean, IOtherList | undefined, Dispatch] {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IOtherList>()

    const load = async (): Promise<void> => {
        setLoading(true)
        const res = await getOtherList()
        const data = res.data
        if (data?.code === -1) {
            message.destroy()
            message.error(data?.msg)
        } else {
            setResponse(data)
        }
        setLoading(false)
    }

    return [loading, response, load]
}
