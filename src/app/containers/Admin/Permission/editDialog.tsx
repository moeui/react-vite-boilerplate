import './editDialog.styl'

import { Button, Form, Input, message, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { putUser } from '../../../services/adminServer/adminServer'

interface IParams {
    id: number | null
    text?: string | null
    type?: string | null
}

export interface IEditDialog {
    show(params: IParams): void
    hide(params: IParams): void
    reset(params: IParams): void
}

export default forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [params, setParams] = useState<IParams>({
        id: null,
        text: null,
        type: null
    })
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const confirm = (): void => {
        form.validateFields().then(async val => {
            setLoading(true)
            const res = await putUser(params.id, val)
            const data = res.data
            if (data?.code === -1) {
                message.destroy()
                message.error(data?.msg)
            } else {
                setShow(false)
                message.success('修改成功')
            }
            setLoading(false)
        })
    }

    useImperativeHandle(ref, () => ({
        show: (params: IParams) => {
            setShow(true)
            setParams(params)
        },
        hide: async (params: IParams) => {
            if (params) {
                setParams(params)
            }
            setShow(false)
        },
        reset: async (params: IParams) => {
            setParams(params)
        }
    }))

    return (
        <Modal visible={show} onCancel={() => setShow(false)} footer={null} wrapClassName="editDialog" centered width={380} destroyOnClose={true}>
            <Form form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input placeholder="Password" />
                </Form.Item>
            </Form>
            <Button loading={loading} onClick={() => confirm()}>
                提交
            </Button>
        </Modal>
    )
})
