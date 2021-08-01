import { Button, Form, Input, message, Select, Upload } from 'antd'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import AdminLayout from '../../../components/Layout/adminLayout'
import { getOther, postOther, putOther } from '../../../services/adminServer/adminServer'
import { html_decode } from '../../../utils'
import { getQueryStringByName } from '../../../utils/browser'
import { baseService } from '../../../utils/config'
import css from './list.module.styl'

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 }
}
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 }
}

function Detail(props: RouteComponentProps): JSX.Element {
    const id = getQueryStringByName('id')
    const [form] = Form.useForm()
    const jump = (target: string): void => {
        props.history.push(target)
    }

    const submit = (): void => {
        form.validateFields().then(async val => {
            const response = id ? await putOther(id, val) : await postOther(val)
            message.destroy()
            if (response.data.code === 0) {
                message.success('操作成功！')
                jump(`/other`)
            } else if (response.data.code === 1) {
                message.error(response.data.msg)
                jump('/login')
            } else {
                message.error(response.data.msg)
            }
        })
    }

    const load = async (): Promise<void> => {
        if (id) {
            const res = await getOther(id)
            if (res.data.code === 0) {
                form.setFieldsValue(res.data.data)
            } else if (res.data.code === 1) {
                message.error(res.data.msg)
                jump('/login')
            }
        }
    }

    useEffect(() => {
        if (id) {
            load()
        } else {
            form.setFieldsValue({ title: '', index: 1, type: 1 })
        }
    }, [id])

    return (
        <AdminLayout className={css.pageList} key={`${id}`}>
            <Form {...layout} className={css.search} form={form}>
                <Form.Item label="key" name="key">
                    <Input placeholder="请输入key" />
                </Form.Item>
                <Form.Item label="value" name="value">
                    <Input placeholder="请输入value" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={() => submit()}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </AdminLayout>
    )
}

export default withRouter(Detail)
