import { Form, Input, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import AddDialog, { IAddDialog } from './addDialog'
import DelDialog, { IDelDialog } from './delDialog'
import EditDialog, { IEditDialog } from './editDialog'
import useList, { ColumnType } from './hook/useList'
import css from './list.module.styl'

export default (): JSX.Element => {
    const history = useHistory()
    const [form] = Form.useForm()
    const [loading, response, getList] = useList()
    const [page, setPage] = useState(1)
    const [username, setUsername] = useState()
    const onSearch = (): void => {
        form.validateFields().then(val => {
            setPage(1)
            setUsername(val.username)
        })
    }
    const addRef = useRef<IAddDialog>(null)
    const editRef = useRef<IEditDialog>(null)
    const delRef = useRef<IDelDialog>(null)
    const columns: ColumnType = [
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <div className={css.btnWrap}>
                        <div onClick={() => editRef.current?.show({ id: record.id })}>编辑</div>
                        <div onClick={() => delRef.current?.show({ id: record.id })}>删除</div>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getList({ page, pageSize: 10, username })
    }, [page, username])

    return (
        <div className={css.pageList}>
            <div className={css.header}>
                <Form className={css.search} form={form}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <div className={css.btn} onClick={() => onSearch()}>
                        搜索
                    </div>
                </Form>
                <div onClick={() => addRef.current?.show()}>添加用户</div>
            </div>
            <Table
                className={css.list}
                loading={loading}
                dataSource={response?.data?.list || []}
                columns={columns}
                rowKey={key => {
                    return key.id
                }}
                pagination={{
                    total: response?.data?.total || 0,
                    onChange: val => setPage(val)
                }}
            />
            <AddDialog
                ref={addRef}
                completed={() => {
                    getList({ page, pageSize: 10, username })
                }}
            />
            <EditDialog ref={editRef} />
            <DelDialog
                ref={delRef}
                completed={() => {
                    getList({ page, pageSize: 10, username })
                }}
            />
        </div>
    )
}
