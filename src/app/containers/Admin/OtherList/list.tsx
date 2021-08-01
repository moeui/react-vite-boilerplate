import { Table } from 'antd'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import AdminLayout from '../../../components/Layout/adminLayout'
import DelDialog, { IDelDialog } from './delDialog'
import useList, { ColumnType } from './hook/useList'
import css from './list.module.styl'

function List(props: RouteComponentProps): JSX.Element {
    const [loading, response, getList] = useList()
    const delRef = useRef<IDelDialog | null>(null)
    const columns: ColumnType = [
        {
            title: 'key',
            dataIndex: 'key'
        },
        {
            title: 'value',
            dataIndex: 'value'
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <div className={css.btnWrap}>
                        <Link to={`/otherDetail?id=${record.id}`}>编辑</Link>
                        <div onClick={() => delRef.current?.show({ id: record.id })}>删除</div>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getList()
    }, [])

    return (
        <AdminLayout className={css.pageList}>
            <div className={css.header}>
                <div className={css.search}></div>
                <Link to={`/otherDetail`}>新增</Link>
            </div>
            <Table
                className={css.list}
                loading={loading}
                dataSource={response?.data || []}
                columns={columns}
                rowKey={key => {
                    return key.id
                }}
                pagination={false}
            />
            <DelDialog
                ref={delRef}
                completed={() => {
                    getList()
                }}
            />
        </AdminLayout>
    )
}

export default withRouter(List)
