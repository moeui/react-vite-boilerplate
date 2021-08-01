import { Form, Input, Table } from 'antd'
import dayjs from 'dayjs'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import AdminLayout from '../../../components/Layout/adminLayout'
import { getQueryStringByName } from '../../../utils/browser'
import DelDialog, { IDelDialog } from './delDialog'
import useList, { ColumnType } from './hook/useList'
import css from './list.module.styl'

function List(props: RouteComponentProps): JSX.Element {
    const [form] = Form.useForm()
    const [loading, response, getList] = useList()
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState()
    const onSearch = (): void => {
        form.validateFields().then(val => {
            setPage(1)
            setTitle(val.title)
        })
    }
    const search = props.history.location.search
    const lng = getQueryStringByName('lng')
    const delRef = useRef<IDelDialog | null>(null)
    const columns: ColumnType = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '排序',
            dataIndex: 'index'
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: text => {
                return text === 1 ? '进行中' : '往期'
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <div className={css.btnWrap}>
                        <Link to={`/postDetail?lng=${lng}&id=${record.id}`}>编辑</Link>
                        <div onClick={() => delRef.current?.show({ id: record.id })}>删除</div>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getList({ page, pageSize: 10, title, lng })
    }, [page, title, lng])

    return (
        <AdminLayout className={css.pageList}>
            <div className={css.header}>
                <Form className={css.search} form={form}>
                    <Form.Item name="title" rules={[{ required: true, message: 'Please input role name!' }]}>
                        <Input placeholder="请输入标题" />
                    </Form.Item>
                    <div className={css.btn} onClick={() => onSearch()}>
                        搜索
                    </div>
                </Form>
                <Link to={`/postDetail?lng=${lng}`}>新增文章</Link>
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
            <DelDialog
                ref={delRef}
                completed={() => {
                    getList({ page, pageSize: 10, title, lng: search.replace('?lng=', '') })
                }}
                lng={lng}
            />
        </AdminLayout>
    )
}

export default withRouter(List)
